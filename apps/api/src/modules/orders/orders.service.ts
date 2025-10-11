import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionType, WalletOwnerType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: CreateOrderDto) {
    const total = input.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        currency: 'USD',
        status: 'paid',
        paymentProvider: 'stripe',
        affiliateId: input.affiliateId,
        resellerId: input.resellerId,
        orderItems: {
          create: input.items.map((item) => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    await this.prisma.walletTransaction.create({
      data: {
        wallet: {
          connectOrCreate: {
            where: { ownerId: userId },
            create: {
              ownerId: userId,
              ownerType: WalletOwnerType.USER,
              balance: new Decimal(0)
            }
          }
        },
        type: TransactionType.CREDIT,
        amount: total,
        reason: 'Order commission',
        refType: 'order',
        refId: order.id
      }
    });

    return order;
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id }, include: { orderItems: true } });
  }

  listByUser(userId: string) {
    return this.prisma.order.findMany({ where: { userId }, include: { orderItems: true } });
  }

  listAll() {
    return this.prisma.order.findMany({ include: { orderItems: true } });
  }
}
