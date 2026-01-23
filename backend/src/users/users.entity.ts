import { Document } from 'src/documents/documents.entity';
import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: string;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @ManyToMany(() => Task, (tasks) => tasks.users)
  tasks: Task[];

  @OneToMany(() => Document, (documents) => documents.user)
  documents: Document[];
}
