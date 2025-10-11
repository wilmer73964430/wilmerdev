import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, input: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: {
        userId,
        subject: input.subject,
        priority: input.priority ?? 'MEDIUM',
        messages: {
          create: {
            authorId: userId,
            body: input.message
          }
        }
      },
      include: { messages: true }
    });
  }

  list(userId: string, mine?: boolean) {
    if (mine) {
      return this.prisma.ticket.findMany({ where: { userId }, include: { messages: true } });
    }
    return this.prisma.ticket.findMany({ include: { messages: true } });
  }

  addMessage(userId: string, ticketId: string, input: CreateMessageDto) {
    return this.prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: userId,
        body: input.body
      }
    });
  }
}
