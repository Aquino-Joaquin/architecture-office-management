import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get()
  getAllProjects() {
    return 'All projects';
  }

  @Get(':id')
  getOneProject(@Param('id', ParseIntPipe) id: number) {
    return `Project number ${id}`;
  }

  @Post()
  createProject(@Body() temp: string) {
    return 'Created';
  }

  @Patch(':id')
  updateProject(@Param('id', ParseIntPipe) id: number) {
    return `Updated ${id}`;
  }

  @Patch(':id/status')
  updateProjectStatus(@Param('id', ParseIntPipe) id: number) {
    return `Updated status ${id}`;
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return `Deleted project ${id}`;
  }
}
