import { ConflictException, HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Feedback } from 'src/entities/feedback.entity';

export class FeedbackMapper {
  constructor(
    @Inject('FEEDBACK_REPOSITORY')
    private feedbackRepository: Repository<Feedback>,
  ) {}
  async getTotalCount(user_id) {
    return await this.feedbackRepository
      .createQueryBuilder()
      .select('count(*) as count')
      .where({ user_id })
      .getRawOne();
  }

  async createFeedback(user_id, store_id, user_feedback) {
    const feedback = [];
    for (const f of user_feedback) {
      delete f['exist'];
      feedback.push(JSON.stringify(f));
    }
    return await this.feedbackRepository
      .createQueryBuilder()
      .insert()
      .values({ store_id, user_id, feedback: `[${feedback}]` })
      .execute();
  }

  async getFeedbacks(user_id, viewCount, startCount) {
    const result = await this.feedbackRepository
      .createQueryBuilder()
      .select('num, store_id, date, feedback')
      .where(`user_id = '${user_id}'`)
      .orderBy('num', 'DESC')
      .limit(viewCount)
      .offset(startCount)
      .getRawMany();
    return result;
  }
}
