import { IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  planId!: string;

  @IsOptional()
  @IsString()
  paymentMethodId?: string;
}
