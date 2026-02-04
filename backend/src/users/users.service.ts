import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateUserDto } from './dtos/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      order: { id: 'ASC' },
      relations: {
        projects: true,
      },
    });
  }
  async getAllUserFromProject(projectId: number) {
    return await this.userRepository.find({
      where: { projects: { id: projectId } },
      order: { id: 'ASC' },
      relations: {
        projects: true,
      },
    });
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    Object.assign(user, updateUser);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    user.projects = [];
    await this.userRepository.save(user);
    return await this.userRepository.delete(id);
  }
}
