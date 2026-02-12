import { Status } from 'src/common/status';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'milestones' })
export class Milestone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Project, (project) => project.milestones, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @OneToMany(() => Task, (tasks) => tasks.milestone)
  tasks: Task[];
}
