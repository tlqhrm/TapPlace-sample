import { Injectable } from '@nestjs/common';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { UserLogMapper } from './userlog.mapper';

@Injectable()
export class UserlogService {
  constructor(private userLogMapper: UserLogMapper) {}
  async create(createUserlogDto: CreateUserlogDto) {
    return await this.userLogMapper.createUserLog(createUserlogDto);
  }
}
