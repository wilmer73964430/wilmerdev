import { IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  providerId!: string;

  @IsString()
  serviceId!: string;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reserved?: number;

  @IsOptional()
  @IsObject()
  metadataJson?: Record<string, unknown>;
}
