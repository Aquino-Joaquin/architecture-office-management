import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.documents)
  user: User;

  @ManyToOne(() => Project, (project) => project.documents)
  project: Project;
}
