import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { v4 as uuid } from 'uuid';
import { PlanType, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: CreateSubscriptionDto) {
    const plan = await this.prisma.plan.findUnique({ where: { id: input.planId } });
    if (!plan) {
      throw new NotFoundException('Plan no encontrado');
    }

    const subscription = await this.prisma.subscription.create({
      data: {
        userId,
        planId: plan.id,
        status: SubscriptionStatus.ACTIVE,
        secondaryPanelKey: plan.type === PlanType.SECONDARY ? `${uuid()}` : undefined,
        secondaryDomain:
          plan.type === PlanType.SECONDARY ? `${userId.split('-')[0]}.socialmentorify.app` : undefined
      },
      include: { plan: true }
    });

    return subscription;
  }

  findOne(id: string) {
    return this.prisma.subscription.findUnique({ where: { id }, include: { plan: true } });
  }

  async cancel(id: string) {
    const subscription = await this.prisma.subscription.update({
      where: { id },
      data: { status: SubscriptionStatus.CANCELED }
    });
    if (!subscription) {
      throw new NotFoundException('Suscripción no encontrada');
    }
    return subscription;
  }
}
