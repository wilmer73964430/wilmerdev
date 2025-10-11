import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class OrderItemInput {
  @IsString()
  serviceId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  unitPrice!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];

  @IsOptional()
  @IsString()
  affiliateId?: string;

  @IsOptional()
  @IsString()
  resellerId?: string;
}
