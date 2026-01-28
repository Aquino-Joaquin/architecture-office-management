import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty({ message: 'document.title.required' })
  @IsString({ message: 'document.title.string' })
  title: string;

  @IsNotEmpty({ message: 'document.url.required' })
  @IsUrl({}, { message: 'document.url.invalid' })
  url: string;

  @IsNotEmpty({ message: 'document.path.required' })
  @IsString({ message: 'document.path.string' })
  path: string;

  @IsNotEmpty({ message: 'document.type.required' })
  @IsString({ message: 'document.type.string' })
  type: string;

  @IsNotEmpty({ message: 'document.projectId.required' })
  @IsNumber({}, { message: 'document.projectId.number' })
  projectId: number;
}
