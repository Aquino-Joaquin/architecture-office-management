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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;

  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
