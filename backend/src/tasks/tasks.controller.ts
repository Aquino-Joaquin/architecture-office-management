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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpadateTaskDto } from './dtos/updateTaksDto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get('projects/:id')
  getAllTaskFromProject(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getAllTaskFromProject(id);
  }
  @Get('milestones/:id')
  getAllTaskFromMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getAllTaskFromMilestone(id);
  }
  @Get('users/:id')
  getAllTaskFromUser(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getAllTaskFromUser(id);
  }
  @Post()
  createTask(@Body(ValidationPipe) createTask: CreateTaskDto) {
    return this.tasksService.createTask(createTask);
  }
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTask: UpadateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTask);
  }
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
