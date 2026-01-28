import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'user.name.required' })
  @IsString({ message: 'user.name.string' })
  name: string;

  @IsNotEmpty({ message: 'user.email.required' })
  @IsEmail({}, { message: 'user.email.invalid' })
  email: string;

  @IsStrongPassword({}, { message: 'user.password.weak' })
  password: string;

  @IsNotEmpty({ message: 'user.role.required' })
  @IsString({ message: 'user.role.string' })
  role: string;
}
