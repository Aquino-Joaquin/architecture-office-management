import { Milestone } from 'src/milestones/milestones.entity';
import { Project } from 'src/projects/projects.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => Milestone, (milestone) => milestone.tasks)
  milestone: Milestone;
}
