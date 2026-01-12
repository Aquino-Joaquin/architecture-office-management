import { ExpenseType } from 'src/expense-types/expense-types.entity';
import { Project } from 'src/projects/projects.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  type: string;
  @ManyToOne(() => ExpenseType, (type) => type.expenses)
  expenseType: ExpenseType;

  @ManyToOne(() => Project, (project) => project.expenses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  project: Project;
}
