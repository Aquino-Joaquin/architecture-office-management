import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './createExpenseDto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
