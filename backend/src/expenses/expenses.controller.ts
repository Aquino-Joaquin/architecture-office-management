import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/createExpenseDto';
import { UpdateExpenseDto } from './dtos/updateExpenseDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin', 'Staff')
  @Get()
  getAllExpenses(@Req() req) {
    return this.expenseService.getAllExpenses(req.user);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Get(':id')
  getOneExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.getOneExpense(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Post()
  createExpense(@Body(ValidationPipe) createExpense: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpense);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Patch(':id')
  updateExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateExpense: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(id, updateExpense);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Delete(':id')
  deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.deleteExpense(id);
  }
}
