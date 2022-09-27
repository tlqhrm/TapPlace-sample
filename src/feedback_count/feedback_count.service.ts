import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FeedbackCount } from 'src/entities/feedback_count.entity';
import { UserMapper } from 'src/user/user.mapper';
import { Repository } from 'typeorm';
import { CreateFeedbackCountDto } from './dto/create-feedback_count.dto';
import { UpdateFeedbackCountDto } from './dto/update-feedback_count.dto';

@Injectable()
export class FeedbackCountService {
  limit: number;
  constructor(
    @Inject('FEEDBACK_COUNT_REPOSITORY')
    private fcRepository: Repository<FeedbackCount>,
    private userMapper: UserMapper,
  ) {
    this.limit = 200;
  }
  async increseCount(user_id) {
    const find = await this.fineOne(user_id);
    let result;
    if (find) {
      const count = find['count'];
      if (count >= this.limit) throw new HttpException('피드백 횟수 초과', 400);
      else {
        await this.fcRepository
          .createQueryBuilder()
          .update()
          .set({
            count: () => 'count + 1',
          })
          .where({ user_id })
          .execute();
        result = this.limit - find['count'] - 1;
      }
    } else {
      await this.fcRepository
        .createQueryBuilder()
        .insert()
        .into('feedback_count')
        .values({ user_id, count: 1 })
        .execute();
      result = this.limit - 1;
    }
    return result;
  }

  async fineOne(user_id) {
    const user = await this.userMapper.getUser(user_id);
    if (!user) throw new HttpException('존재하지 않는 유저', 400);
    const find = await this.fcRepository
      .createQueryBuilder()
      .where({ user_id })
      .getOne();
    return find;
  }

  async remainCount(user_id) {
    const find = await this.fineOne(user_id);
    const result = {
      remain_count: this.limit,
    };
    if (find) {
      result['remain_count'] = this.limit - find['count'];
    }
    return result;
  }
}
