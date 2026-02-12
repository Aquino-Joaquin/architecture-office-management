import { Milestone } from 'src/milestones/milestones.entity';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => Milestone, (milestone) => milestone.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  milestone: Milestone;

  @ManyToMany(() => User, (users) => users.tasks)
  @JoinTable()
  users: User[];
}
