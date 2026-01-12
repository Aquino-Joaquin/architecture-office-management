import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expenses.entity';
import { Project } from 'src/projects/projects.entity';
import { ExpenseType } from 'src/expense-types/expense-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Project, ExpenseType])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
