import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Milestone } from './milestones.entity';
import { Repository } from 'typeorm';
import { CreateMilestoneDto } from './dtos/createMilestoneDto';
import { UpdateMilestoneDto } from './dtos/updateMilestoneDto';
import { Project } from 'src/projects/projects.entity';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAllMilestonesFromProject(projecId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projecId },
      relations: { milestones: true },
    });
    if (!project) throw new NotFoundException();
    const milestones = project.milestones;
    return milestones;
  }

  async getOneMilestone(id: number) {
    const milestone = await this.milestoneRepository.findOneBy({ id });
    if (!milestone) throw new NotFoundException();
    return milestone;
  }
  async createMilestone(createMilestone: CreateMilestoneDto) {
    const project = await this.projectRepository.findOneBy({
      id: createMilestone.projectId,
    });
    if (!project) throw new NotFoundException();
    const newMilestone = this.milestoneRepository.create({
      title: createMilestone.title,
      description: createMilestone.description,
      project,
    });

    return this.milestoneRepository.save(newMilestone);
  }
  async updateMilestone(id: number, updateMilestone: UpdateMilestoneDto) {
    const milestone = await this.milestoneRepository.findOneBy({ id });
    if (!milestone) throw new NotFoundException();
    Object.assign(milestone, updateMilestone);
    return await this.milestoneRepository.save(milestone);
  }
  async deleteMilestone(id: number) {
    const milestone = await this.milestoneRepository.findOneBy({ id });
    if (!milestone) throw new NotFoundException();
    return await this.milestoneRepository.delete(id);
  }
}
