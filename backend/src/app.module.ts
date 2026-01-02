import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { ExpensesModule } from './expenses/expenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Client } from './clients/clients.entity';
import { Project } from './projects/projects.entity';
import { Expense } from './expenses/expenses.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ClientsModule,
    ProjectsModule,
    ExpensesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbUrl = process.env.DATABASE_URL;

        const isSslEnabled =
          process.env.NODE_ENV === 'production' ||
          (dbUrl &&
            (dbUrl.includes('railway.app') || dbUrl.includes('neon.tech')));

        return {
          type: 'postgres',
          url: dbUrl,
          autoLoadEntities: true,
          synchronize: true,

          ssl: isSslEnabled ? { rejectUnauthorized: false } : false,
          extra: isSslEnabled
            ? { ssl: { rejectUnauthorized: false } }
            : undefined,

          entities: [User, Client, Project, Expense],
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
