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
import { User } from 'src/users/users.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllDocumentsFromProject(projectId: number, user: JwtUser) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { users: true },
    });
    if (!project) throw new NotFoundException();
    if (project.users.find((u) => u.id === user.id)) {
      const documents = await this.documentRepository.find({
        where: { project: { id: projectId } },
        relations: { user: true },
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
  async createDocument(createDocument: CreateDocumentDto, newUser: JwtUser) {
    const { title, url, type, projectId } = createDocument;
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) throw new NotFoundException();
    const user = await this.userRepository.findOneBy({ id: newUser.id });
    if (!user) throw new NotFoundException();
    const document = this.documentRepository.create({
      title,
      url,
      type,
      project,
      user,
    });
    return await this.documentRepository.save(document);
  }
  async deleteDocument(id: number) {
    const document = await this.documentRepository.findOneBy({ id });
    if (!document) throw new NotFoundException();
    return this.documentRepository.delete(id);
  }
}
