import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpenseTypesModule } from './expense-types/expense-types.module';
import { MilestonesModule } from './milestones/milestones.module';
import { TasksModule } from './tasks/tasks.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/users.entity';
import { Client } from './clients/clients.entity';
import { Project } from './projects/projects.entity';
import { Expense } from './expenses/expenses.entity';
import { ExpenseType } from './expense-types/expense-types.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,
    ClientsModule,
    ProjectsModule,
    ExpensesModule,
    ExpenseTypesModule,
    AuthModule,
    MilestonesModule,
    TasksModule,
    DocumentsModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: () => {
        const dbUrl = process.env.DATABASE_URL;

        const isSslEnabled =
          process.env.NODE_ENV === 'production' &&
          !!dbUrl &&
          (dbUrl.includes('railway.app') || dbUrl.includes('neon.tech'));

        return {
          type: 'postgres',
          url: dbUrl,

          autoLoadEntities: true,

          // Para esta primera instalación.
          // Más adelante conviene utilizar migrations.
          synchronize: true,

          ssl: isSslEnabled ? { rejectUnauthorized: false } : false,

          extra: isSslEnabled
            ? {
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : undefined,

          entities: [User, Client, Project, Expense, ExpenseType],
        };
      },
    }),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
