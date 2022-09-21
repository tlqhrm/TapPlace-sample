import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { DatabaseModule } from 'src/database/database.module';
import { feedbackRepository } from 'src/repositories/feedback.repository';
import { FeedbackMapper } from './feedback.mapper';
import { StoreModule } from 'src/store/store.module';
import { BookmarkMapper } from 'src/bookmark/bookmark.mapper';
import { bookmarkRepository } from 'src/repositories/bookmark.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackMapper,
    ...feedbackRepository,
    BookmarkMapper,
    ...bookmarkRepository,
  ],
  exports: [FeedbackMapper, ...feedbackRepository],
})
export class FeedbackModule {}
