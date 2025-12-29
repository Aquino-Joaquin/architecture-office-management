import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Client } from 'src/clients/clients.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Client, User])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
