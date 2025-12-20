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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/createProjectDto';
import { UpdateProjectDto } from './dtos/updateProjectDto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getOneProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getOneProject(id);
  }

  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    return this.projectService.createProject(createProject);
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProject: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProject);
  }

  @Patch(':id/status')
  updateProjectStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) status: string,
  ) {
    return this.projectService.updateProjectStatus(id, status);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
}
