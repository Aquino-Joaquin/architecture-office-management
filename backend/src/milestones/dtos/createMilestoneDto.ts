import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMilestoneDto {
  @IsNotEmpty({ message: 'milestone.title.required' })
  @IsString({ message: 'milestone.title.string' })
  title: string;

  @IsNotEmpty({ message: 'milestone.description.required' })
  @IsString({ message: 'milestone.description.string' })
  description: string;

  @IsOptional()
  @IsBoolean({ message: 'milestone.completed.boolean' })
  completed?: boolean;

  @IsNotEmpty({ message: 'milestone.projectId.required' })
  @IsNumber({}, { message: 'milestone.projectId.number' })
  projectId: number;
}
