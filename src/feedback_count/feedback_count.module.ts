import { Module } from '@nestjs/common';
import { FeedbackCountService } from './feedback_count.service';
import { FeedbackCountController } from './feedback_count.controller';
import { feedbackCountRepository } from 'src/repositories/feedback_count.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [FeedbackCountController],
  providers: [FeedbackCountService, ...feedbackCountRepository],
  exports: [FeedbackCountService, ...feedbackCountRepository],
})
export class FeedbackCountModule {}
