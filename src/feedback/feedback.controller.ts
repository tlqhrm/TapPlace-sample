import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get(':user_id/:store_id/:page')
  findOne(
    @Param('user_id') user_id: string,
    @Param('store_id') store_id: string,
    @Param('page') page: number,
  ) {
    return this.feedbackService.getFeedbacks(user_id, store_id, page);
  }

  @Get('bookmark/:user_id')
  getTotalCount(@Param('user_id') user_id: string) {
    return this.feedbackService.getFeedBookCount(user_id);
  }
}
