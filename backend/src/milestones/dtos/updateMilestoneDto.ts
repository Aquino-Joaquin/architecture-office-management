import { PartialType } from '@nestjs/mapped-types';
import { CreateMilestoneDto } from './createMilestoneDto';
export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {}
