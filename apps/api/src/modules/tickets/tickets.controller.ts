import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { MockAuthGuard } from '../../common/guards/mock-auth.guard';
import { Request } from 'express';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@UseGuards(MockAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Post()
  create(@Req() req: Request, @Body() input: CreateTicketDto) {
    const userId = (req as any).user?.id as string;
    return this.tickets.create(userId, input);
  }

  @Get()
  list(@Req() req: Request, @Query('mine') mine?: string) {
    const userId = (req as any).user?.id as string;
    return this.tickets.list(userId, mine === '1');
  }

  @Post(':id/messages')
  message(@Req() req: Request, @Param('id') id: string, @Body() input: CreateMessageDto) {
    const userId = (req as any).user?.id as string;
    return this.tickets.addMessage(userId, id, input);
  }
}
