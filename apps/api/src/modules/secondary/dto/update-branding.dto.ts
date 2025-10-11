import { IsObject, IsString } from 'class-validator';

export class UpdateBrandingDto {
  @IsString()
  subscriptionId!: string;

  @IsObject()
  branding!: Record<string, unknown>;
}
