import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('expenses')
export class ExpensesController {
  @Get()
  getAllExpenses() {
    return 'All expenses';
  }

  @Get(':id')
  getOneExpense(@Param('id', ParseIntPipe) id: number) {
    return `Expense number ${id}`;
  }

  @Post()
  createExpense(@Body() temp: string) {
    return 'Created';
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number) {
    return `Expense number ${id}`;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return `Expense number ${id}`;
  }
}
