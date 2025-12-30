import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expenses.entity';
import { Project } from 'src/projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Project])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
