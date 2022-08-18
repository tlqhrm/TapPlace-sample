import { PartialType } from '@nestjs/mapped-types';
import { CreatePaylistDto } from './create-paylist.dto';

export class UpdatePaylistDto extends PartialType(CreatePaylistDto) {}
