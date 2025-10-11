import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@UseGuards(MockAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly wallet: WalletService) {}

  @Get()
  getWallet(@Req() req: Request) {
    const userId = (req as any).user?.id as string;
    return this.wallet.getWallet(userId);
  }

  @Get('transactions')
  getTransactions(@Req() req: Request) {
    const userId = (req as any).user?.id as string;
    return this.wallet.getWallet(userId);
  }

  @Post('withdrawals')
  createWithdrawal(@Req() req: Request, @Body() input: CreateWithdrawDto) {
    const userId = (req as any).user?.id as string;
    return this.wallet.createWithdrawal(userId, input);
  }
}
