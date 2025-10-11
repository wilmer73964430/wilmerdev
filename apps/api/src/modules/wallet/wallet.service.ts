import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { WalletOwnerType, WithdrawStatus } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getWallet(userId: string) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { ownerId: userId },
      include: { transactions: { orderBy: { createdAt: 'desc' } } }
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          ownerId: userId,
          ownerType: WalletOwnerType.USER,
          balance: new Decimal(0)
        },
        include: { transactions: true }
      });
    }

    return wallet;
  }

  async createWithdrawal(userId: string, input: CreateWithdrawDto) {
    const wallet = await this.getWallet(userId);
    return this.prisma.withdrawRequest.create({
      data: {
        walletId: wallet.id,
        amount: input.amount,
        method: input.method,
        accountRef: input.accountRef,
        status: WithdrawStatus.PENDING
      }
    });
  }
}
