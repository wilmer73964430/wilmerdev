import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AffiliatesService } from './affiliates.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';
import { CreateAffiliateLinkDto } from './dto/create-link.dto';

@UseGuards(MockAuthGuard)
@Controller('affiliates')
export class AffiliatesController {
  constructor(private readonly affiliates: AffiliatesService) {}

  @Post('links')
  createLink(@Req() req: Request, @Body() input: CreateAffiliateLinkDto) {
    const userId = (req as any).user?.id as string;
    return this.affiliates.createLink(userId, input);
  }

  @Get('stats')
  stats(@Req() req: Request) {
    const userId = (req as any).user?.id as string;
    return this.affiliates.stats(userId);
  }

  @Get('referrals')
  referrals(@Req() req: Request) {
    const userId = (req as any).user?.id as string;
    return this.affiliates.referrals(userId);
  }
}
