import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDocumentDto } from './dtos/createDocumentDto';
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
@UseGuards(AuthGuard('jwt'))
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get('projects/:id')
  getAllDocumentsFromProject(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.documentsService.getAllDocumentsFromProject(id, req.user);
  }
  @Get(':id')
  getOneDocument(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.documentsService.getOneDocument(id, req.user);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) createDocument: CreateDocumentDto,
    @Req() req,
  ) {
    return this.documentsService.createDocument(createDocument, file, req.user);
  }

  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.documentsService.deleteDocument(id, req.user);
  }
}
