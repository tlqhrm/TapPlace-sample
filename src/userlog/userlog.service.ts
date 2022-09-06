import { Injectable } from '@nestjs/common';
import { TermsMapper } from 'src/terms/terms.mapper';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { UserLogMapper } from './userlog.mapper';

@Injectable()
export class UserlogService {
  constructor(
    private userLogMapper: UserLogMapper,
    private termsMapper: TermsMapper,
  ) {}

  async createUserLog(createUserlogDto: CreateUserlogDto) {
    await this.userLogMapper.createUserLog(createUserlogDto);
    const result = {};
    // result['terms'] = await this.termsMapper.findLast();
    return await this.termsMapper.findLast();
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
