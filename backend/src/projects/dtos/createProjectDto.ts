import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/status';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'project.name.required' })
  @IsString({ message: 'project.name.string' })
  name: string;

  @IsNotEmpty({ message: 'project.description.required' })
  @IsString({ message: 'project.description.string' })
  description: string;

  @IsNotEmpty({ message: 'project.status.required' })
  @IsEnum(Status, { message: 'project.status.invalid' })
  status: Status;

  @IsNotEmpty({ message: 'project.totalPrice.required' })
  @IsNumber({}, { message: 'project.totalPrice.number' })
  totalPrice: number;

  @IsOptional()
  @IsNumber({}, { message: 'project.amountPaid.number' })
  amountPaid?: number;

  @IsNotEmpty({ message: 'project.clientId.required' })
  @IsNumber({}, { message: 'project.clientId.number' })
  clientId: number;

  @IsOptional()
  @IsArray({ message: 'project.userIds.array' })
  @IsNumber({}, { each: true, message: 'project.userIds.number' })
  userIds?: number[];
}
