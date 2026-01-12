import { Client } from 'src/clients/clients.entity';
import { Status } from 'src/common/status';
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

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PLANNNING,
  })
  status: Status;

  @Column()
  totalPrice: number;

  @Column()
  amountPaid: number;

  @ManyToOne(() => Client, (client) => client.projects)
  client: Client;

  @OneToMany(() => Expense, (expense) => expense.project)
  expenses: Expense[];

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];
}
