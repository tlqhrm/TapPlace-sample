import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackCountService } from './feedback_count.service';
import { CreateFeedbackCountDto } from './dto/create-feedback_count.dto';
import { UpdateFeedbackCountDto } from './dto/update-feedback_count.dto';

@Controller('feedback-count')
export class FeedbackCountController {
  constructor(private readonly feedbackCountService: FeedbackCountService) {}

  // @Post()
  // create(@Body() createFeedbackCountDto: CreateFeedbackCountDto) {
  //   return this.feedbackCountService.create(createFeedbackCountDto);
  // }

  @Get(':user_id')
  remain(@Param('user_id') user_id: string) {
    return this.feedbackCountService.remainCount(user_id);
  }
}
