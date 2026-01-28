import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'client.name.required' })
  @IsString({ message: 'client.name.string' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'client.email.invalid' })
  email?: string;

  @IsPhoneNumber('PY', { message: 'client.phone.invalid' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'client.companyName.string' })
  companyName?: string;
}
