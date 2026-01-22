import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDocumentDto } from './dtos/createDocumentDto';
import { UpdateDocumentDto } from './dtos/updateDocumentDto';

@Controller('documents')
export class DocumentsController {
  @Get('projects/:id')
  getAllDocumentsFromProject(@Param('id', ParseIntPipe) id: number) {}
  @Get(':id')
  getOneDocument(@Param('id', ParseIntPipe) id: number) {}
  @Post()
  createDocument(@Body(ValidationPipe) createDocument: CreateDocumentDto) {}
  @Patch(':id')
  updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDocument: UpdateDocumentDto,
  ) {}
  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {}
}
