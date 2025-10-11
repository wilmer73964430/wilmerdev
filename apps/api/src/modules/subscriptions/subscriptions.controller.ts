import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptions: SubscriptionsService) {}

  @UseGuards(MockAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() input: CreateSubscriptionDto) {
    const userId = (req as any).user?.id as string;
    return this.subscriptions.create(userId, input);
  }

  @UseGuards(MockAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptions.findOne(id);
  }

  @UseGuards(MockAuthGuard, PermissionsGuard)
  @Permissions('subscription.cancel')
  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.subscriptions.cancel(id);
  }
}
