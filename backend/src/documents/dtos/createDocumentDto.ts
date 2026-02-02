import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty({ message: 'document.title.required' })
  @IsString({ message: 'document.title.string' })
  title: string;

  @IsNotEmpty({ message: 'document.projectId.required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'document.projectId.number' })
  projectId: number;
}
