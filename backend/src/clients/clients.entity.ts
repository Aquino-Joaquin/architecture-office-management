import { Project } from 'src/projects/projects.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  companyName: string;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];
}
