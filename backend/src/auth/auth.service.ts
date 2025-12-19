import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dtos/loginUserDto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/createUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUser: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      name: loginUser.userName,
    });
    if (!user) return null;

    const comaparePassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    );

    return comaparePassword ? user : null;
  }
  async registerUser(createUser: CreateUserDto) {
    const newUser = this.userRepository.create(createUser);
    newUser.password = bcrypt.hashSync(createUser.password, 10);
    return this.userRepository.save(newUser);
  }

  async loginUser(loggedUser: User) {
    const payload = {
      sub: loggedUser.id,
      userName: loggedUser.name,
      role: loggedUser.role,
    };
    return {
      id: loggedUser.id,
      userName: loggedUser.name,
      role: loggedUser.role,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
