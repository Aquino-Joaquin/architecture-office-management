import { PartialType } from '@nestjs/mapped-types';
import { CreateMilestoneDto } from './CreateMilestoneDto';

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {}
