import { forwardRef, Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { DatabaseModule } from 'src/database/database.module';
import { feedbackRepository } from 'src/repositories/feedback.repository';
import { FeedbackMapper } from './feedback.mapper';
import { StoreModule } from 'src/store/store.module';

import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { UserModule } from 'src/user/user.module';
import { FeedbackCountModule } from 'src/feedback_count/feedback_count.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    BookmarkModule,
    UserModule,
    FeedbackCountModule,
    AdminModule,
    forwardRef(() => StoreModule),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackMapper, ...feedbackRepository],
  exports: [FeedbackMapper, ...feedbackRepository],
})
export class FeedbackModule {}
