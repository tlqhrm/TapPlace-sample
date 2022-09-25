import { HttpException, Injectable } from '@nestjs/common';
import { PayMapper } from 'src/pay/pay.mapper';
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
    private payMapper: PayMapper,
  ) {}

  async createUserLog(createUserlogDto: CreateUserlogDto) {
    const { user_id } = createUserlogDto;
    const user = await this.userMapper.getUser(user_id);
    // if (!user) throw new HttpException('존재하지 않는 유저', 404);
    if (user) await this.userLogMapper.createUserLog(createUserlogDto);

    const result = {
      personal_date: true,
      service_date: true,
    };
    if (user) {
      const terms = await this.termsMapper.findLast();
      if (user['personal_date'] !== terms['personal_date'])
        result['personal_date'] = false;
      if (user['service_date'] !== terms['service_date'])
        result['service_date'] = false;
    }

    const totalFeedbackCount = await this.payMapper.getCount();
    result['count'] = totalFeedbackCount['count'];
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
