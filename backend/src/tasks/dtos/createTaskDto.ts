import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @IsOptional()
  @IsNumber()
  milestoneId: number;
}
