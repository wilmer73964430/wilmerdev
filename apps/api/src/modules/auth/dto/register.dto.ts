import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { RoleType } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(RoleType)
  @IsOptional()
  role?: RoleType = RoleType.USUARIO;

  @IsString()
  @IsOptional()
  name?: string;
}
