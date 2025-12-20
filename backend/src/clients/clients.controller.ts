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
import { CreateClientDto } from './dtos/createClientDto';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dtos/updateClientDto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}
  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getOneClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getOneClient(id);
  }

  @Post()
  createClient(@Body(ValidationPipe) createClient: CreateClientDto) {
    return this.clientService.createClient(createClient);
  }

  @Patch(':id')
  updateOneClient(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateClient: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id, updateClient);
  }

  @Delete(':id')
  deleteOneClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteOneClient(id);
  }
}
