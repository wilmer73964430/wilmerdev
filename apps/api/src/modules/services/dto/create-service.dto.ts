import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ServiceType } from '@prisma/client';

export class CreateServiceDto {
  @IsEnum(ServiceType)
  type!: ServiceType;

  @IsOptional()
  @IsString()
  providerId?: string;

  @IsString()
  name!: string;

  @IsString()
  sku!: string;

  @IsNumber()
  basePrice!: number;

  @IsObject()
  @IsOptional()
  metadataJson?: Record<string, unknown>;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
