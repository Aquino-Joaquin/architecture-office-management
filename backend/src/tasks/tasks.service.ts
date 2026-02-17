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
import { JwtUser } from 'src/auth/jwt-user.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAllTaskFromUser(user: JwtUser) {
    const tasks = await this.taskRepository.find({
      order: { id: 'ASC' },
      where: { users: { id: user.id } },
      relations: { milestone: true },
    });
    if (!tasks) return new NotFoundException();
    return tasks;
  }
  async getAllTaskFromMilestone(milestoneId: number) {
    const tasks = await this.taskRepository.find({
      order: { id: 'ASC' },
      where: { milestone: { id: milestoneId } },
      relations: { users: true },
    });
    if (!tasks) throw new NotFoundException();
    return tasks;
  }

  async createTask(createTask: CreateTaskDto) {
    const milestone = createTask.milestoneId
      ? await this.milestoneRepository.findOne({
          where: { id: createTask.milestoneId },
          relations: { project: true },
        })
      : null;

    if (createTask.milestoneId && !milestone) {
      throw new NotFoundException('Milestone not found');
    }

    const project = createTask.projectId
      ? await this.projectRepository.findOne({
          where: { id: createTask.projectId },
        })
      : milestone?.project;

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (
      milestone &&
      createTask.projectId &&
      milestone.project?.id !== createTask.projectId
    ) {
      throw new BadRequestException(
        'Milestone does not belong to the provided projectId',
      );
    }

    let users: User[] = [];
    if (createTask.userIds?.length) {
      users = await this.userRepository.findBy({ id: In(createTask.userIds) });
      if (users.length !== createTask.userIds.length) {
        throw new BadRequestException('Some users not found');
      }
    }

    const newTask = this.taskRepository.create({
      title: createTask.title,
      description: createTask.description,
      completed: createTask.completed ?? false,
      project,
      milestone: milestone ?? undefined,
      users,
    });

    return this.taskRepository.save(newTask);
  }
  async updateTask(id: number, updateTask: UpadateTaskDto, user: JwtUser) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { milestone: true, project: true, users: true },
    });
    if (!task) throw new NotFoundException();

    if (user.role !== 'Admin') {
      const isAssigned = task.users.some((u) => u.id === user.id);
      if (!isAssigned) {
        throw new NotFoundException();
      }
      if (updateTask.completed !== undefined) {
        task.completed = updateTask.completed;
        return this.taskRepository.save(task);
      }
    }

    const { title, description, completed, projectId, milestoneId, userIds } =
      updateTask;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    if (milestoneId !== undefined) {
      const milestone = await this.milestoneRepository.findOne({
        where: { id: milestoneId },
        relations: { project: true },
      });
      if (!milestone) throw new NotFoundException('Milestone not found');

      const milestoneProject = milestone.project;
      if (!milestoneProject)
        throw new NotFoundException('Milestone project not found');

      if (projectId !== undefined && milestoneProject.id !== projectId) {
        throw new BadRequestException(
          'Milestone does not belong to the provided projectId',
        );
      }

      task.milestone = milestone;
      task.project = milestoneProject;
    } else if (projectId !== undefined) {
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) throw new NotFoundException('Project not found');
      task.project = project;
    }

    if (userIds !== undefined) {
      const users = await this.userRepository.find({
        where: { id: In(userIds) },
      });

      if (users.length !== userIds.length) {
        throw new BadRequestException('Some users not found');
      }

      task.users = users;
    }

    return this.taskRepository.save(task);
  }
  async deleteTask(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    return await this.taskRepository.delete(id);
  }
}
