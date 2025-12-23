import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto } from './dtos/createClientDto';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dtos/updateClientDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Role('Admin')
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
