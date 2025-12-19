import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/createUserDto';
import { LoginUserDto } from './dtos/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUser(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.authService.registerUser;
  }
  @Post('login')
  async loginUser(@Body(ValidationPipe) loginUser: LoginUserDto) {
    const validUser = await this.authService.validateUser(loginUser);
    if (!validUser)
      throw new UnauthorizedException(
        'You entered a wrong password or username',
      );

    return this.authService.loginUser(validUser);
  }
}
