import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './users/users.entity';
import { Client } from './clients/clients.entity';
import { Project } from './projects/projects.entity';
import { Expense } from './expenses/expenses.entity';
import { ExpenseType } from './expense-types/expense-types.entity';
import { Document } from './documents/documents.entity';
import { Task } from './tasks/tasks.entity';
import { Milestone } from './milestones/milestones.entity';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  entities: [
    User,
    Client,
    Project,
    Expense,
    ExpenseType,
    Document,
    Task,
    Milestone,
  ],

  synchronize: false,
});

async function seed() {
  await dataSource.initialize();

  console.log('Connected to database');

  const userRepository = dataSource.getRepository(User);

  const adminName = 'admin';
  const adminEmail = 'admin@local.com';
  const adminPassword = 'Admin1234!';

  const existingUser = await userRepository.findOne({
    where: { name: adminName },
  });

  if (existingUser) {
    console.log(`Admin user already exists: ${adminName}`);

    await dataSource.destroy();
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = userRepository.create({
    name: adminName,
    email: adminEmail,
    password: hashedPassword,
    role: 'Admin',
  });

  await userRepository.save(admin);

  console.log('');
  console.log('=================================');
  console.log('ADMIN USER CREATED');
  console.log('=================================');
  console.log(`Name:     ${adminName}`);
  console.log(`Email:    ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log(`Role:     Admin`);
  console.log('=================================');
  console.log('');

  await dataSource.destroy();
}

seed().catch(async (error) => {
  console.error('Error creating admin user:', error);

  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }

  process.exit(1);
});
