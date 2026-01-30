import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/createProjectDto';
import { UpdateProjectDto } from './dtos/updateProjectDto';
import { Client } from 'src/clients/clients.entity';
import { User } from 'src/users/users.entity';
import { JwtUser } from 'src/auth/jwt-user.type';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllProjects(user: JwtUser) {
    if (user.role === 'Admin') {
      return await this.projectRepository.find({
        order: { id: 'ASC' },
        relations: {
          client: true,
          users: true,
        },
      });
    } else {
      return await this.projectRepository.find({
        order: { id: 'ASC' },
        where: { users: { id: user.id } },
        relations: {
          client: true,
          users: true,
        },
      });
    }
  }

  async getOneProject(id: number, user: JwtUser) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        client: true,
        users: true,
      },
    });

    if (!project) throw new NotFoundException();
    if (user.role === 'Admin') return project;

    const isUserAssigned = project.users.some((u) => u.id === user.id);
    if (!isUserAssigned) throw new ForbiddenException();

    return project;
  }

  async createProject(createProject: CreateProjectDto) {
    const client = await this.clientRepository.findOneBy({
      id: createProject.clientId,
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    let users: User[] = [];
    if (createProject.userIds?.length) {
      users = await this.userRepository.findBy({
        id: In(createProject.userIds),
      });

      if (users.length !== createProject.userIds.length) {
        throw new BadRequestException('Some users not found');
      }
    }

    const project = this.projectRepository.create({
      name: createProject.name,
      description: createProject.description,
      status: createProject.status,
      totalPrice: createProject.totalPrice,
      amountPaid: createProject.amountPaid,
      client,
      users,
    });

    return this.projectRepository.save(project);
  }

  async updateProject(
    id: number,
    updateProject: UpdateProjectDto,
    user: JwtUser,
  ) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        users: true,
        client: true,
      },
    });

    if (!project) throw new NotFoundException('Project not found');

    if (user.role == 'Staff') {
      if (updateProject.status !== undefined) {
        project.status = updateProject.status;
        return this.projectRepository.save(project);
      }
    }
    const {
      name,
      description,
      status,
      totalPrice,
      amountPaid,
      clientId,
      userIds,
    } = updateProject;

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;
    if (totalPrice !== undefined) project.totalPrice = totalPrice;
    if (amountPaid !== undefined) project.amountPaid = amountPaid;

    if (clientId !== undefined) {
      const client = await this.clientRepository.findOneBy({ id: clientId });
      if (!client) throw new NotFoundException('Client not found');
      project.client = client;
    }

    if (userIds !== undefined) {
      project.users = await this.userRepository.find({
        where: { id: In(userIds) },
      });
    }

    return this.projectRepository.save(project);
  }

  async deleteProject(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    return this.projectRepository.delete(id);
  }
}
