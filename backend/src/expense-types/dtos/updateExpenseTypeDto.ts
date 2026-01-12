import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseTypeDto } from './createExpenseTypeDto';

export class UpdateExpenseTypeDto extends PartialType(CreateExpenseTypeDto) {}
