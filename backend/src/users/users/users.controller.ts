import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'All Users';
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return `User number ${id}`;
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number) {
    return `User number ${id}`;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return `User number ${id}`;
  }
}
