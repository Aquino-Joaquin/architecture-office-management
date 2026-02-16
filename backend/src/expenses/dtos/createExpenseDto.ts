import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'expense.amount.required' })
  @IsNumber({}, { message: 'expense.amount.number' })
  amount: number;

  @IsNotEmpty({ message: 'expense.description.required' })
  @IsString({ message: 'expense.description.string' })
  description: string;

  @IsNotEmpty({ message: 'expense.expenseTypeId.required' })
  @IsNumber({}, { message: 'expense.expenseTypeId.number' })
  expenseTypeId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'expense.projectId.number' })
  projectId: number;
}
