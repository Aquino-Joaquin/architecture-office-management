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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpadateTaskDto } from './dtos/updateTaksDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('milestones/:id')
  getAllTaskFromMilestone(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getAllTaskFromMilestone(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  getAllTaskFromUser(@Req() req) {
    return this.tasksService.getAllTaskFromUser(req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Post()
  createTask(@Body(ValidationPipe) createTask: CreateTaskDto) {
    return this.tasksService.createTask(createTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTask: UpadateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.updateTask(id, updateTask, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('Admin')
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
