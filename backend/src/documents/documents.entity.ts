import { Project } from 'src/projects/projects.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  type: string;

  @ManyToOne(() => Project, (project) => project.documents)
  project: Project;
}
