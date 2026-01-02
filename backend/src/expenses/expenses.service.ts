import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expenses.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/createExpenseDto';
import { UpdateExpenseDto } from './dtos/updateExpenseDto';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import { JwtUser } from 'src/auth/jwt-user.type';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAllExpenses(user: JwtUser) {
    if (user.role == 'Admin') {
      return await this.expenseRepository.find({
        relations: {
          project: true,
        },
      });
    } else {
      return this.expenseRepository.find({
        where: {
          project: {
            users: {
              id: user.id,
            },
          },
        },
        relations: {
          project: true,
        },
      });
    }
  }
  async getOneExpense(id: number) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();
    return expense;
  }
  async createExpense(createExpense: CreateExpenseDto) {
    let project: Project | null = null;

    if (createExpense.projectId) {
      project = await this.projectRepository.findOneBy({
        id: createExpense.projectId,
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const newExpense = this.expenseRepository.create({
        amount: createExpense.amount,
        description: createExpense.description,
        type: createExpense.type,
        project,
      });
      return await this.expenseRepository.save(newExpense);
    }
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
