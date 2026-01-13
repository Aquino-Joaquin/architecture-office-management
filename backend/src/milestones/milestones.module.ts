import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Milestone } from './milestones.entity';
import { Project } from 'src/projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone, Project])],
  controllers: [MilestonesController],
  providers: [MilestonesService],
})
export class MilestonesModule {}
