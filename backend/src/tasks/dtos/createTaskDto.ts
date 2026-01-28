import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'task.title.required' })
  @IsString({ message: 'task.title.string' })
  title: string;

  @IsNotEmpty({ message: 'task.description.required' })
  @IsString({ message: 'task.description.string' })
  description: string;

  @IsOptional()
  @IsBoolean({ message: 'task.completed.boolean' })
  completed?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'task.projectId.number' })
  projectId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'task.milestoneId.number' })
  milestoneId?: number;

  @IsOptional()
  @IsArray({ message: 'task.userIds.array' })
  @IsNumber({}, { each: true, message: 'task.userIds.number' })
  userIds?: number[];
}
