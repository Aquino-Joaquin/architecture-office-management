import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/createProjectDto';
import { UpdateProjectDto } from './dtos/updateProjectDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin', 'Staff')
  @Get()
  getAllProjects(@Req() req) {
    return this.projectService.getAllProjects(req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin', 'Staff')
  @Get(':id')
  getOneProject(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.projectService.getOneProject(id, req.user);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    return this.projectService.createProject(createProject);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin', 'Staff')
  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProject: UpdateProjectDto,
    @Req() req,
  ) {
    return this.projectService.updateProject(id, updateProject, req.user);
  }

  @Patch(':id/status')
  updateProjectStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) status: string,
  ) {
    return this.projectService.updateProjectStatus(id, status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
}
