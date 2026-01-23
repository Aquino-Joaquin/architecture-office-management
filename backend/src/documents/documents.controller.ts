import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDocumentDto } from './dtos/createDocumentDto';
import { UpdateDocumentDto } from './dtos/updateDocumentDto';
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('projects/:id')
  getAllDocumentsFromProject(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.documentsService.getAllDocumentsFromProject(id, req.user);
  }
  @Get(':id')
  getOneDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.getOneDocument(id);
  }
  @Post()
  createDocument(@Body(ValidationPipe) createDocument: CreateDocumentDto) {
    return this.documentsService.createDocument(createDocument);
  }
  @Patch(':id')
  updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDocument: UpdateDocumentDto,
  ) {
    return this.documentsService.updateDocument(id, updateDocument);
  }
  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.deleteDocument(id);
  }
}
