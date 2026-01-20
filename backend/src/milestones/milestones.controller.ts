import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateMilestoneDto } from './dtos/updateMilestoneDto';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto } from './dtos/createMilestoneDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestoneService: MilestonesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('projects/:id')
  getAllMilestonesFromProject(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.getAllMilestonesFromProject(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOneMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.getOneMilestone(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Post()
  createMilestone(@Body(ValidationPipe) createMilestone: CreateMilestoneDto) {
    return this.milestoneService.createMilestone(createMilestone);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Patch(':id')
  updateMilestone(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMilestone: UpdateMilestoneDto,
  ) {
    return this.milestoneService.updateMilestone(id, updateMilestone);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Delete(':id')
  deleteMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.deleteMilestone(id);
  }
}
