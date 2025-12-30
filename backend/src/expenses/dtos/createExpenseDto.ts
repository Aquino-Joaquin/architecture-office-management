import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNumber()
  projectId: number;
}
