import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Client } from 'src/clients/clients.entity';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Client, User, Document])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
