import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/createProjectDto';
import { UpdateProjectDto } from './dtos/updateProjectDto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAllProjects() {
    return await this.projectRepository.find();
  }

  async getOneProject(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    return project;
  }

  async createProject(createProject: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProject);
    return await this.projectRepository.save(newProject);
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
