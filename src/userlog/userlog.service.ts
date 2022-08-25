import { Injectable } from '@nestjs/common';
import { PayListMapper } from 'src/paylist/paylist.mapper';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { UserLogMapper } from './userlog.mapper';

@Injectable()
export class UserlogService {
  constructor(
    private userLogMapper: UserLogMapper,
    private paylistMapper: PayListMapper,
  ) {}

  async createUserLog(createUserlogDto: CreateUserlogDto) {
    await this.userLogMapper.createUserLog(createUserlogDto);

    return this.paylistMapper.findAllPayList();
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
