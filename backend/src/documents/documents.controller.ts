import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDocumentDto } from './dtos/createDocumentDto';
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
  createDocument(
    @Body(ValidationPipe) createDocument: CreateDocumentDto,
    @Req() req,
  ) {
    return this.documentsService.createDocument(createDocument, req.user);
  }
  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.deleteDocument(id);
  }
}
