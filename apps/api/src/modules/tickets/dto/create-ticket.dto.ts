import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  subject!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}
