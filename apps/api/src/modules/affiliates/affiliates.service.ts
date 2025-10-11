import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAffiliateLinkDto } from './dto/create-link.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AffiliatesService {
  constructor(private readonly prisma: PrismaService) {}

  async createLink(userId: string, input: CreateAffiliateLinkDto) {
    const affiliate = await this.prisma.affiliate.upsert({
      where: { userId },
      update: {
        model: input.model,
        percent: input.percent ?? 10
      },
      create: {
        userId,
        code: uuid().split('-')[0].toUpperCase(),
        model: input.model,
        percent: input.percent ?? 10
      }
    });

    return affiliate;
  }

  stats(userId: string) {
    return this.prisma.referral.aggregate({
      where: { affiliate: { userId } },
      _sum: { commissionAmount: true },
      _count: true
    });
  }

  referrals(userId: string) {
    return this.prisma.referral.findMany({
      where: { affiliate: { userId } },
      include: { user: true, order: true }
    });
  }
}
