import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './createTaskDto';

export class UpadateTaskDto extends PartialType(CreateTaskDto) {}
