import { Expense } from 'src/expenses/expenses.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ExpenseTypes' })
export class ExpenseType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Expense, (expense) => expense.expenseType)
  expenses: Expense[];
}
