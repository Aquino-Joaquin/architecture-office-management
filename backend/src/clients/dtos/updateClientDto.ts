import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './CreateClientDto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
