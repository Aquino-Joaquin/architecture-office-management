import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/createExpenseDto';
import { UpdateExpenseDto } from './dtos/updateExpenseDto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}
  @Get()
  getAllExpenses() {
    return this.expenseService.getAllExpenses();
  }

  @Get(':id')
  getOneExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.getOneExpense(id);
  }

  @Post()
  createExpense(@Body(ValidationPipe) createExpense: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpense);
  }

  @Patch(':id')
  updateExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateExpense: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(id, updateExpense);
  }

  @Delete(':id')
  deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.deleteExpense(id);
  }
}
