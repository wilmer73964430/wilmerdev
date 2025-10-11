import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PlanType } from '@prisma/client';

export class CreatePlanDto {
  @IsString()
  code!: string;

  @IsEnum(PlanType)
  type!: PlanType;

  @IsNumber()
  price!: number;

  @IsString()
  @IsOptional()
  currency?: string = 'USD';

  @IsString()
  @IsOptional()
  interval?: string = 'monthly';

  @IsObject()
  @IsOptional()
  benefitsJson?: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  limitsJson?: Record<string, unknown>;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
