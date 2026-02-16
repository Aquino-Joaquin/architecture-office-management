import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateExpenseTypeDto } from './dtos/createExpenseTypeDto';
import { UpdateExpenseTypeDto } from './dtos/updateExpenseTypeDto';
import { ExpenseTypesService } from './expense-types.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Role('Admin')
@Controller('expense-types')
export class ExpenseTypesController {
  constructor(private readonly expenseTypesService: ExpenseTypesService) {}
  @Get()
  getAllExpenseTypes() {
    return this.expenseTypesService.getAllExpenseTypes();
  }
  @Get(':id')
  getOneExpenseType(@Param('id', ParseIntPipe) id: number) {
    return this.expenseTypesService.getOneExpenseType(id);
  }
  @Post()
  createExpenseType(
    @Body(ValidationPipe) createExpenseType: CreateExpenseTypeDto,
  ) {
    return this.expenseTypesService.createExpenseType(createExpenseType);
  }

  @Patch(':id')
  updateExpenseType(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateExpenseType: UpdateExpenseTypeDto,
  ) {
    return this.expenseTypesService.updateExpenseType(id, updateExpenseType);
  }

  @Delete()
  deleteExpenseType(@Param('id', ParseIntPipe) id: number) {}
}
