import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/createProjectDto';
import { UpdateProjectDto } from './dtos/updateProjectDto';
import { Client } from 'src/clients/clients.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllProjects() {
    return await this.projectRepository.find();
  }

  async getOneProject(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    return project;
  }

  async createProject(dto: CreateProjectDto) {
    const client = await this.clientRepository.findOneBy({
      id: dto.clientId,
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    let users: User[] = [];
    if (dto.userIds?.length) {
      users = await this.userRepository.findBy({
        id: In(dto.userIds),
      });

      if (users.length !== dto.userIds.length) {
        throw new BadRequestException('Some users not found');
      }
    }

    const project = this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      status: dto.status,
      totalPrice: dto.totalPrice,
      amountPaid: dto.amountPaid,
      client,
      users,
    });

    return this.projectRepository.save(project);
  }

  async updateProject(id: number, updateProject: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    Object.assign(project, updateProject);
    return await this.projectRepository.save(project);
  }

  async updateProjectStatus(id: number, newStatus: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    Object.assign(project, { status: newStatus });
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    return this.projectRepository.delete(project);
  }
}
