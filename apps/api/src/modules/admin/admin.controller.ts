import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@UseGuards(MockAuthGuard, PermissionsGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Permissions('plan.update')
  @Get('metrics')
  metrics() {
    return this.admin.metrics();
  }

  @Permissions('wallet.withdraw.approve')
  @Get('withdrawals')
  withdrawals() {
    return this.admin.withdrawals();
  }

  @Permissions('wallet.withdraw.approve')
  @Post('withdrawals/:id/approve')
  approve(@Param('id') id: string) {
    return this.admin.updateWithdrawal(id, 'APPROVED');
  }

  @Permissions('wallet.withdraw.approve')
  @Post('withdrawals/:id/reject')
  reject(@Param('id') id: string) {
    return this.admin.updateWithdrawal(id, 'REJECTED');
  }

  @Permissions('wallet.withdraw.approve')
  @Post('withdrawals/:id/mark-paid')
  markPaid(@Param('id') id: string) {
    return this.admin.updateWithdrawal(id, 'PAID');
  }

  @Permissions('plan.update')
  @Get('audit-logs')
  auditLogs() {
    return this.admin.auditLogs();
  }
}
