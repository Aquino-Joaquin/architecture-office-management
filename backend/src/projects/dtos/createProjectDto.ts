import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

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
