import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AffiliateModel } from '@prisma/client';

export class CreateAffiliateLinkDto {
  @IsEnum(AffiliateModel)
  model!: AffiliateModel;

  @IsOptional()
  @IsNumber()
  percent?: number;
}
