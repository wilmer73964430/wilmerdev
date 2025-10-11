import { IsOptional, IsString } from 'class-validator';

export class ActivateSecondaryDto {
  @IsString()
  subscriptionId!: string;

  @IsOptional()
  @IsString()
  preferredSubdomain?: string;
}
