import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/store/store.mapper';
import { FeedbackMapper } from './feedback.mapper';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { BookmarkMapper } from 'src/bookmark/bookmark.mapper';

@Injectable()
export class FeedbackService {
  constructor(
    private feedbackMapper: FeedbackMapper,
    private bookmarkMapper: BookmarkMapper,
  ) {}

  async getFeedbacks(user_id, store_id, page) {
    const viewCount = 20;
    const startCount = (page - 1) * viewCount;
    const result = {
      total_count: 0,
      isEnd: false,
      feedbacks: [],
    };
    const feedbacks = await this.feedbackMapper.getFeedbacks(
      user_id,
      store_id,
      viewCount,
      startCount,
    );
    console.log(feedbacks);
    for (const feedback of feedbacks) {
      feedback['feedback'] = JSON.parse(feedback['feedback']);
      result['feedbacks'].push(feedback);
    }

    // result['feedbacks'];

    const totalCount = await this.feedbackMapper.getTotalCount(user_id);
    result['total_count'] = totalCount['count'];
    if (totalCount['count'] - viewCount * page <= 0) result['isEnd'] = true;
    console.log(result);

    return result;
  }

  async getFeedBookCount(user_id) {
    const result = {};

    const book = await this.bookmarkMapper.getBookmarkCount(user_id);
    const feed = await this.feedbackMapper.getTotalCount(user_id);
    result['bookmark_count'] = book['count'];
    result['feedback_count'] = feed['count'];

    return result;
  }
}
