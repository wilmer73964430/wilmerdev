import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';

@Controller()
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @UseGuards(MockAuthGuard)
  @Post('checkout')
  create(@Req() req: Request, @Body() input: CreateOrderDto) {
    const userId = (req as any).user?.id as string;
    return this.orders.create(userId, input);
  }

  @UseGuards(MockAuthGuard)
  @Get('orders/:id')
  findOne(@Param('id') id: string) {
    return this.orders.findOne(id);
  }

  @UseGuards(MockAuthGuard)
  @Get('orders')
  list(@Req() req: Request, @Query('mine') mine?: string) {
    const userId = (req as any).user?.id as string;
    if (mine === '1') {
      return this.orders.listByUser(userId);
    }
    return this.orders.listAll();
  }
}
