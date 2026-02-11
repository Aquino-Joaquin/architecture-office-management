import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expenses.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/createExpenseDto';
import { UpdateExpenseDto } from './dtos/updateExpenseDto';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import { JwtUser } from 'src/auth/jwt-user.type';
import { ExpenseType } from 'src/expense-types/expense-types.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(ExpenseType)
    private expenseTypeRepository: Repository<ExpenseType>,
  ) {}

  async getAllExpenses(user: JwtUser) {
    if (user.role == 'Admin') {
      return await this.expenseRepository.find({
        order: { createdAt: 'ASC' },
        relations: {
          project: true,
          expenseType: true,
        },
      });
    } else {
      return this.expenseRepository.find({
        order: { createdAt: 'ASC' },
        where: {
          project: {
            users: {
              id: user.id,
            },
          },
        },
        relations: {
          project: true,
          expenseType: true,
        },
      });
    }
  }
  async getAllExpensesFromProject(user: JwtUser, projectId: number) {
    if (user.role == 'Admin') {
      return await this.expenseRepository.find({
        where: { project: { id: projectId } },
        order: { createdAt: 'ASC' },
        relations: {
          project: true,
          expenseType: true,
        },
      });
    } else {
      return this.expenseRepository.find({
        order: { createdAt: 'ASC' },
        where: {
          project: {
            id: projectId,
            users: {
              id: user.id,
            },
          },
        },
        relations: {
          project: true,
          expenseType: true,
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
      const expenseType = await this.expenseTypeRepository.findOneBy({
        id: createExpense.expenseTypeId,
      });
      if (!expenseType) throw new NotFoundException();

      const newExpense = this.expenseRepository.create({
        amount: createExpense.amount,
        description: createExpense.description,
        expenseType,
        project,
      });
      return await this.expenseRepository.save(newExpense);
    }
  }

  async updateExpense(id: number, updateExpense: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();

    const { amount, description, expenseTypeId, projectId } = updateExpense;

    if (amount !== undefined) expense.amount = amount;
    if (description !== undefined) expense.description = description;
    if (expenseTypeId !== undefined) {
      const expenseType = await this.expenseTypeRepository.findOneBy({
        id: expenseTypeId,
      });
      if (!expenseType) throw new NotFoundException('Expense type not found');
      expense.expenseType = expenseType;
    }
    if (projectId !== undefined) {
      const project = await this.projectRepository.findOneBy({
        id: projectId,
      });
      if (!project) throw new NotFoundException('Project not found');
      expense.project = project;
    }
    return await this.expenseRepository.save(expense);
  }
  async deleteExpense(id: number) {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException();
    return await this.expenseRepository.delete(id);
  }
}
