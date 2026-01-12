import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
