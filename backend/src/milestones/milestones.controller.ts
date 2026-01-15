import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateMilestoneDto } from './dtos/updateMilestoneDto';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto } from './dtos/createMilestoneDto';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestoneService: MilestonesService) {}
  @Get('projects/:id')
  getAllMilestonesFromProject(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.getAllMilestonesFromProject(id);
  }
  @Get(':id')
  getOneMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.getOneMilestone(id);
  }
  @Post()
  createMilestone(@Body(ValidationPipe) createMilestone: CreateMilestoneDto) {
    return this.milestoneService.createMilestone(createMilestone);
  }

  @Patch(':id')
  updateMilestone(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMilestone: UpdateMilestoneDto,
  ) {
    return this.milestoneService.updateMilestone(id, updateMilestone);
  }

  @Delete(':id')
  deleteMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.deleteMilestone(id);
  }
}
