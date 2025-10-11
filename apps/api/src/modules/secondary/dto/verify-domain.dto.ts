import { IsString } from 'class-validator';

export class VerifyDomainDto {
  @IsString()
  subscriptionId!: string;

  @IsString()
  domain!: string;
}
