import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseType } from './expense-types.entity';
import { Repository } from 'typeorm';
import { CreateExpenseTypeDto } from './dtos/createExpenseTypeDto';
import { UpdateExpenseTypeDto } from './dtos/updateExpenseTypeDto';

@Injectable()
export class ExpenseTypesService {
  constructor(
    @InjectRepository(ExpenseType)
    private expenseTypeRepository: Repository<ExpenseType>,
  ) {}

  async getAllExpenseTypes() {
    return this.expenseTypeRepository.find();
  }
  async getOneExpenseType(id: number) {
    const expenseType = await this.expenseTypeRepository.findOneBy({ id });
    if (!expenseType) throw new NotFoundException('Expense type not found');
    return expenseType;
  }

  async createExpenseType(createExpenseType: CreateExpenseTypeDto) {
    const newExpenseType = this.expenseTypeRepository.create(createExpenseType);
    return await this.expenseTypeRepository.save(newExpenseType);
  }
  async updateExpenseType(id: number, updateExpenseType: UpdateExpenseTypeDto) {
    const expenseType = await this.expenseTypeRepository.findOneBy({ id });
    if (!expenseType) throw new NotFoundException('Expense type not found');
    Object.assign(expenseType, updateExpenseType);
    return await this.expenseTypeRepository.save(expenseType);
  }
  async deleteExpenseType(id: number) {
    const expenseType = await this.expenseTypeRepository.findOneBy({ id });
    if (!expenseType) throw new NotFoundException();
    return await this.expenseTypeRepository.delete(id);
  }
}
