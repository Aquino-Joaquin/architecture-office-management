import { Client } from 'src/clients/clients.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  status: string;

  @Column()
  totalPrice: number;

  @Column()
  amoutPaid: number;

  @ManyToOne(() => Client, (client) => client.projects)
  client: Client;

  @OneToMany(() => Expense, (expense) => expense.project)
  expenses: Expense[];

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];
}
