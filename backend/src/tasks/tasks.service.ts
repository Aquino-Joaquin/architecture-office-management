import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { In, Repository } from 'typeorm';
import { Milestone } from 'src/milestones/milestones.entity';
import { Project } from 'src/projects/projects.entity';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpadateTaskDto } from './dtos/updateTaksDto';
import { User } from 'src/users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAllTaskFromMilestone(milestoneId: number) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId },
      relations: { tasks: true },
    });
    if (!milestone) throw new NotFoundException();
    const tasks = milestone.tasks;
    return tasks;
  }
  async getAllTaskFromProject(projectId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { tasks: true },
    });
    if (!project) throw new NotFoundException();
    const tasks = project.tasks;
    return tasks;
  }
  async createTask(createTask: CreateTaskDto) {
    let project = await this.projectRepository.findOne({
      where: { id: createTask.projectId },
    });
    const milestone = await this.milestoneRepository.findOne({
      where: { id: createTask.milestoneId },
      relations: { project: true },
    });

    if (!project) {
      if (!milestone) throw new NotFoundException();
      project = milestone.project;
      if (!project) throw new NotFoundException();
    }

    let users: User[] = [];
    if (createTask.userIds?.length) {
      users = await this.userRepository.findBy({
        id: In(createTask.userIds),
      });

      if (users.length !== createTask.userIds.length) {
        throw new BadRequestException('Some users not found');
      }
    }
    const newTask = this.taskRepository.create({
      title: createTask.title,
      description: createTask.description,
      project,
      milestone: milestone ?? undefined,
      users,
    });
    return this.taskRepository.save(newTask);
  }
  async updateTask(id: number, updateTask: UpadateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    const { title, description, completed, projectId, milestoneId, userIds } =
      updateTask;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (milestoneId !== undefined) {
      const milestone = await this.milestoneRepository.findOneBy({
        id: milestoneId,
      });
      if (!milestone) throw new NotFoundException();
      const project = milestone.project;
      if (!project) throw new NotFoundException();
      task.milestone = milestone;
      task.project = project;
    } else if (projectId !== undefined) {
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) throw new NotFoundException();
      task.project = project;
    }
    if (userIds !== undefined) {
      task.users = await this.userRepository.find({
        where: { id: In(userIds) },
      });
    }
    return this.taskRepository.save(task);
  }
  async deleteTask(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    return await this.taskRepository.delete(id);
  }
}
