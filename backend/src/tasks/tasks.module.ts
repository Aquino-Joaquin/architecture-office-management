import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Project } from 'src/projects/projects.entity';
import { Milestone } from 'src/milestones/milestones.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project, Milestone, User])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
