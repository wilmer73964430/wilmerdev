import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsString()
  apiBase?: string;

  @IsOptional()
  @IsString()
  apiKeyEncrypted?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
