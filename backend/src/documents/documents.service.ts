import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './documents.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/createDocumentDto';

import { promises as fs } from 'fs';
import { createReadStream } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { JwtUser } from '../auth/jwt-user.type';
import { Project } from '../projects/projects.entity';
import { User } from '../users/users.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ---------------------------------------------------------
  // GET ALL DOCUMENTS FROM PROJECT
  // ---------------------------------------------------------

  async getAllDocumentsFromProject(projectId: number, user: JwtUser) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { users: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isAdmin = user.role === 'Admin';

    const isUserInProject = project.users.some((u) => u.id === user.id);

    if (!isAdmin && !isUserInProject) {
      throw new NotFoundException();
    }

    const documents = await this.documentRepository.find({
      order: { id: 'ASC' },
      where: {
        project: { id: projectId },
      },
      relations: {
        user: true,
      },
    });

    return documents;
  }

  // ---------------------------------------------------------
  // GET ONE DOCUMENT
  // ---------------------------------------------------------

  async getOneDocument(id: number, user: JwtUser) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: {
        project: {
          users: true,
        },
        user: true,
      },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const isAdmin = user.role === 'Admin';

    const isUserInProject = document.project.users.some(
      (u) => u.id === user.id,
    );

    if (!isAdmin && !isUserInProject) {
      throw new NotFoundException();
    }

    return document;
  }

  // ---------------------------------------------------------
  // CREATE DOCUMENT
  // ---------------------------------------------------------

  async createDocument(
    createDocument: CreateDocumentDto,
    file: Express.Multer.File,
    newUser: JwtUser,
  ) {
    const { title, projectId } = createDocument;

    // Buscar proyecto
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { users: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Buscar usuario
    const user = await this.userRepository.findOneBy({
      id: newUser.id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar archivo
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Verificar permisos
    const isAdmin = user.role === 'Admin';

    const isUserInProject = project.users.some((u) => u.id === user.id);

    if (!isAdmin && !isUserInProject) {
      throw new ForbiddenException(
        'You are not allowed to create this document',
      );
    }

    // -------------------------------------------------------
    // EXTENSIÓN
    // -------------------------------------------------------

    const extension = path
      .extname(file.originalname)
      .replace('.', '')
      .toLowerCase();

    if (!extension) {
      throw new BadRequestException('File extension is required');
    }

    // -------------------------------------------------------
    // CARPETA DEL PROYECTO
    // -------------------------------------------------------

    const projectDirectory = path.join(
      process.cwd(),
      'uploads',
      'documents',
      'projects',
      projectId.toString(),
    );

    await fs.mkdir(projectDirectory, {
      recursive: true,
    });

    // -------------------------------------------------------
    // NOMBRE DEL ARCHIVO
    // -------------------------------------------------------

    const fileName = `${randomUUID()}.${extension}`;

    // Ruta absoluta
    const absolutePath = path.join(projectDirectory, fileName);

    // Ruta relativa que guardaremos en PostgreSQL
    const relativePath = path.join(
      'uploads',
      'documents',
      'projects',
      projectId.toString(),
      fileName,
    );

    // -------------------------------------------------------
    // GUARDAR ARCHIVO EN DISCO
    // -------------------------------------------------------

    try {
      await fs.writeFile(absolutePath, file.buffer);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file');
    }

    // -------------------------------------------------------
    // GUARDAR INFORMACIÓN EN POSTGRESQL
    // -------------------------------------------------------

    try {
      const document = this.documentRepository.create({
        title,

        // URL que utilizará React
        url: `/documents/files/${projectId}/${fileName}`,

        // Ruta relativa al proyecto
        path: relativePath,

        type: extension,

        project,

        user,
      });

      return await this.documentRepository.save(document);
    } catch (error) {
      // Si PostgreSQL falla, eliminamos
      // el archivo que acabamos de guardar.

      try {
        await fs.unlink(absolutePath);
      } catch {}

      throw new InternalServerErrorException('Failed to save document');
    }
  }

  // ---------------------------------------------------------
  // DOWNLOAD / OPEN DOCUMENT
  // ---------------------------------------------------------

  async downloadFile(projectId: number, fileName: string, user: JwtUser) {
    // Buscar proyecto
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { users: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Verificar permisos
    const isAdmin = user.role === 'Admin';

    const isUserInProject = project.users.some((u) => u.id === user.id);

    if (!isAdmin && !isUserInProject) {
      throw new NotFoundException();
    }

    // -------------------------------------------------------
    // SEGURIDAD
    // -------------------------------------------------------

    // Evita que alguien intente enviar:
    //
    // ../../../archivo
    //
    // para salir de la carpeta de documentos.

    if (
      fileName.includes('..') ||
      fileName.includes('/') ||
      fileName.includes('\\')
    ) {
      throw new BadRequestException('Invalid file name');
    }

    // -------------------------------------------------------
    // RUTA
    // -------------------------------------------------------

    const filePath = path.join(
      process.cwd(),
      'uploads',
      'documents',
      'projects',
      projectId.toString(),
      fileName,
    );

    // Verificar que existe
    try {
      await fs.access(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }

    // -------------------------------------------------------
    // CREAR STREAM
    // -------------------------------------------------------

    const stream = createReadStream(filePath);

    return new StreamableFile(stream);
  }

  // ---------------------------------------------------------
  // DELETE DOCUMENT
  // ---------------------------------------------------------

  async deleteDocument(id: number, user: JwtUser) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: {
        project: {
          users: true,
        },
      },
    });

    if (!document) {
      throw new NotFoundException();
    }

    // Verificar permisos
    const isAdmin = user.role === 'Admin';

    const isUserInProject = document.project.users.some(
      (u) => u.id === user.id,
    );

    if (!isAdmin && !isUserInProject) {
      throw new NotFoundException();
    }

    // -------------------------------------------------------
    // ELIMINAR ARCHIVO DEL DISCO
    // -------------------------------------------------------

    const absolutePath = path.join(process.cwd(), document.path);

    try {
      await fs.unlink(absolutePath);
    } catch (error) {
      // Si el archivo ya no existe,
      // podemos continuar eliminando
      // el registro de PostgreSQL.

      if (error.code !== 'ENOENT') {
        throw new InternalServerErrorException('Failed to delete file');
      }
    }

    // -------------------------------------------------------
    // ELIMINAR REGISTRO DE POSTGRESQL
    // -------------------------------------------------------

    return this.documentRepository.delete(id);
  }
}
