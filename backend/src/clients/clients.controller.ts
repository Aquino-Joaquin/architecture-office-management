import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('clients')
export class ClientsController {
  @Get()
  getAllClients() {
    return 'All de clients';
  }

  @Get(':id')
  getOneClient(@Param('id', ParseIntPipe) id: number) {
    return `Client ${id}`;
  }

  @Post()
  createClient(@Body() temp: string) {
    return 'Created';
  }

  @Patch(':id')
  updateOneClient(@Param('id', ParseIntPipe) id: number) {
    return `Updated ${id}`;
  }

  @Delete(':id')
  deleteOneClient(@Param('id', ParseIntPipe) id: number) {
    return `Deleted ${id}`;
  }
}
