import { HttpException, Injectable } from '@nestjs/common';
import { TermsMapper } from 'src/terms/terms.mapper';
import { UserMapper } from 'src/user/user.mapper';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { UserLogMapper } from './userlog.mapper';

@Injectable()
export class UserlogService {
  constructor(
    private userLogMapper: UserLogMapper,
    private termsMapper: TermsMapper,
    private userMapper: UserMapper,
  ) {}

  async createUserLog(createUserlogDto: CreateUserlogDto) {
    const { user_id } = createUserlogDto;
    const user = await this.userMapper.getUser(user_id);
    if (!user) new HttpException('존재하지 않는 유저', 400);
    const result = {
      personal_date: true,
      service_date: true,
    };
    await this.userLogMapper.createUserLog(createUserlogDto);
    const terms = await this.termsMapper.findLast();
    if (user['personal_date'] !== terms['personal_date'])
      result['personal_date'] = false;
    if (user['service_date'] !== terms['service_date'])
      result['service_date'] = false;

    return result;
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
