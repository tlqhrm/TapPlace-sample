import { Injectable } from '@nestjs/common';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { UserLogMapper } from './userlog.mapper';

@Injectable()
export class UserlogService {
  constructor(private userLogMapper: UserLogMapper) {}

  async createUserLog(createUserlogDto: CreateUserlogDto) {
    return await this.userLogMapper.createUserLog(createUserlogDto);
  }

  //dev
  async getAllUserLog() {
    return await this.userLogMapper.getAllUserLog();
  }

  async getUserLog(id: string) {
    return await this.userLogMapper.getUserLog(id);
  }

  async deleteUserLog(id: string) {
    return await this.userLogMapper.deleteUserLog(id);
  }
}
