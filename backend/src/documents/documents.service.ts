import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './documents.entity';
import { Repository } from 'typeorm';
import { JwtUser } from 'src/auth/jwt-user.type';
import { Project } from 'src/projects/projects.entity';
import { CreateDocumentDto } from './dtos/createDocumentDto';
import { User } from 'src/users/users.entity';
import { supabaseAdmin } from 'src/common/supabaseAdmin';

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
    if (user.role === 'Admin' || project.users.find((u) => u.id === user.id)) {
      const documents = await this.documentRepository.find({
        order: { id: 'ASC' },
        where: { project: { id: projectId } },
        relations: { user: true },
      });
      return documents;
    }
    throw new NotFoundException();
  }
  async getOneDocument(id: number, user: JwtUser) {
    const project = await this.projectRepository.findOne({
      where: {
        documents: { id },
        users: { id: user.id },
      },
    });

    if (!project) throw new NotFoundException();

    return this.documentRepository.findOneBy({ id });
  }
  async createDocument(
    createDocument: CreateDocumentDto,
    file: Express.Multer.File,
    newUser: JwtUser,
  ) {
    const { title, projectId } = createDocument;

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { users: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    const user = await this.userRepository.findOneBy({ id: newUser.id });
    if (!user) throw new NotFoundException('User not found');

    if (!file) {
      throw new BadRequestException('File is required');
    }
    const isAdmin = user.role === 'Admin';
    const isUserInProject = project.users.some((u) => u.id === user.id);

    if (!isAdmin && !isUserInProject) {
      throw new ForbiddenException(
        'You are not allowed to create this document',
      );
    }

    const extension = file.originalname.split('.').pop();
    const filePath = `projects/${projectId}/${title}-${Date.now()}.${extension}`;

    const { error } = await supabaseAdmin.storage
      .from('documents')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new InternalServerErrorException('Storage upload failed');
    }

    const { data } = supabaseAdmin.storage
      .from('documents')
      .getPublicUrl(filePath);

    const document = this.documentRepository.create({
      title,
      url: data.publicUrl,
      path: filePath,
      type: extension,
      project,
      user,
    });

    return await this.documentRepository.save(document);
  }

  async deleteDocument(id: number, user: JwtUser) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: {
        project: {
          users: true,
        },
      },
    });

    if (!document) throw new NotFoundException();

    const isAdmin = user.role === 'Admin';

    const isUserInProject = document.project.users.some(
      (u) => u.id === user.id,
    );

    if (!isAdmin && !isUserInProject) {
      throw new NotFoundException();
    }

    const { error } = await supabaseAdmin.storage
      .from('documents')
      .remove([document.path]);

    if (error) throw new InternalServerErrorException(error.message);

    return this.documentRepository.delete(id);
  }
}
