import { forwardRef, Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { DatabaseModule } from 'src/database/database.module';
import { feedbackRepository } from 'src/repositories/feedback.repository';
import { FeedbackMapper } from './feedback.mapper';
import { StoreModule } from 'src/store/store.module';
import { BookmarkMapper } from 'src/bookmark/bookmark.mapper';
import { bookmarkRepository } from 'src/repositories/bookmark.repository';
import { FeedbackCount } from 'src/entities/feedback_count.entity';
import { feedbackCountRepository } from 'src/repositories/feedback_count.repository';
import { FeedbackCountService } from 'src/feedback_count/feedback_count.service';
import { UserMapper } from 'src/user/user.mapper';
import { userRepository } from 'src/repositories/user.repository';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { UserModule } from 'src/user/user.module';
import { Feedback } from 'src/entities/feedback.entity';
import { FeedbackCountModule } from 'src/feedback_count/feedback_count.module';

@Module({
  imports: [DatabaseModule, BookmarkModule, UserModule, FeedbackCountModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackMapper, ...feedbackRepository],
  exports: [FeedbackMapper, ...feedbackRepository],
})
export class FeedbackModule {}
