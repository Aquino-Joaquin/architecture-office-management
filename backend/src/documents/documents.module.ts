import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './documents.entity';
import { Project } from 'src/projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Project])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
