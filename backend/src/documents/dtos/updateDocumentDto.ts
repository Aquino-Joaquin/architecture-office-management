import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './createDocumentDto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
