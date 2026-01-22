import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './documents.entity';
import { Repository } from 'typeorm';
import { JwtUser } from 'src/auth/jwt-user.type';
import { Project } from 'src/projects/projects.entity';
import { CreateDocumentDto } from './dtos/createDocumentDto';
import { UpdateDocumentDto } from './dtos/updateDocumentDto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAllDocumentsFromProject(projectId: number, user: JwtUser) {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) throw new NotFoundException();
    if (project.users.find((u) => u.id === user.id)) {
      const documents = await this.documentRepository.find({
        where: { project: { id: projectId } },
      });
      return documents;
    }
    throw new ForbiddenException();
  }
  async getOneDocument(id: number) {
    const document = await this.documentRepository.findOneBy({ id });
    if (!document) throw new NotFoundException();
    return document;
  }
  async createDocument(createDocument: CreateDocumentDto) {
    const document = this.documentRepository.create(createDocument);
    return await this.documentRepository.save(document);
  }
  async updateDocument(id: number, updateDocument: UpdateDocumentDto) {
    const document = await this.documentRepository.findOneBy({ id });
    if (!document) throw new NotFoundException();

    const { title, url, type, projectId } = updateDocument;

    if (title !== undefined) document.title = title;
    if (url !== undefined) document.url = url;
    if (type !== undefined) document.type = type;
    if (projectId !== undefined) {
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) throw new NotFoundException();
      document.project = project;
    }
    return await this.documentRepository.save(document);
  }
  async deleteDocument(id: number) {
    const document = await this.documentRepository.findOneBy({ id });
    if (!document) throw new NotFoundException();
    return this.documentRepository.delete(id);
  }
}
