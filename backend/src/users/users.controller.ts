import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
