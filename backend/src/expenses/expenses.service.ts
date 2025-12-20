import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expenses.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/createExpenseDto';
import { UpdateExpenseDto } from './dtos/updateExpenseDto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  async getAllExpenses() {
    return await this.expenseRepository.find();
  }
  async getOneExpense(id: number) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();
    return expense;
  }
  async createExpense(createExpense: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create(createExpense);
    return await this.expenseRepository.save(newExpense);
  }
  async updateExpense(id: number, updateExpense: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();
    Object.assign(expense, updateExpense);
    return await this.expenseRepository.save(expense);
  }
  async deleteExpense(id: number) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();
    return await this.expenseRepository.delete(expense);
  }
}
