import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './clients.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/createClientDto';
import { UpdateClientDto } from './dtos/updateClientDto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async getAllClients() {
    return await this.clientRepository.find();
  }

  async getOneClient(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) throw new NotFoundException();
    return client;
  }
  async createClient(client: CreateClientDto) {
    const newClient = this.clientRepository.create(client);
    return await this.clientRepository.save(newClient);
  }

  async updateClient(id: number, updateClient: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) throw new NotFoundException();
    Object.assign(client, updateClient);
    return await this.clientRepository.save(client);
  }

  async deleteOneClient(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) throw new NotFoundException();
    return await this.clientRepository.delete(client);
  }
}
