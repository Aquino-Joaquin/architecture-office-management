import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone: number;

  @IsString()
  companyName?: string;
}
