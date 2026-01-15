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
    const milestone = await this.milestoneRepository.find({
      where: { project: { id: projecId } },
      relations: { tasks: true },
    });
    return milestone;
  }

  async getOneMilestone(id: number) {
    const milestone = await this.milestoneRepository.findOneBy({ id });
    if (!milestone) throw new NotFoundException();
    return milestone;
  }
  async createMilestone(
    projectId: number,
    createMilestone: CreateMilestoneDto[],
  ) {
    const project = await this.projectRepository.findOneBy({
      id: projectId,
    });
    if (!project) throw new NotFoundException();
    const milestones = createMilestone.map((m) =>
      this.milestoneRepository.create({
        title: m.title,
        description: m.description,
        project,
      }),
    );
    return await this.milestoneRepository.save(milestones);
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
