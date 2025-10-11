import { IsNumber, IsString, Min } from 'class-validator';

export class CreateWithdrawDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  method!: string;

  @IsString()
  accountRef!: string;
}
