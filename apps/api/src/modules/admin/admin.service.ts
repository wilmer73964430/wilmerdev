import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SubscriptionStatus, TicketStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async metrics() {
    const [mrr, ordersToday, walletBalance, openTickets] = await Promise.all([
      this.prisma.subscription.count({ where: { status: SubscriptionStatus.ACTIVE } }).then((count) => count * 49),
      this.prisma.order.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }),
      this.prisma.wallet.aggregate({ _sum: { balance: true } }),
      this.prisma.ticket.count({ where: { status: TicketStatus.OPEN } })
    ]);

    return {
      mrr,
      ordersToday,
      walletBalance: walletBalance._sum.balance ?? 0,
      openTickets
    };
  }

  withdrawals() {
    return this.prisma.withdrawRequest.findMany({ include: { wallet: true } });
  }

  async updateWithdrawal(id: string, status: 'APPROVED' | 'REJECTED' | 'PAID') {
    return this.prisma.withdrawRequest.update({ where: { id }, data: { status } });
  }

  auditLogs() {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  }
}
