import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  phone: number;
  @Column({ nullable: true })
  companyName: string;
}
