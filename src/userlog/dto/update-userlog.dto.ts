import { PartialType } from '@nestjs/mapped-types';
import { CreateUserlogDto } from './create-userlog.dto';

export class UpdateUserlogDto extends PartialType(CreateUserlogDto) {}
