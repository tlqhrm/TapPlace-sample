import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { userPipe } from 'src/auth/auth.pipe';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get(':user_id/:store_id/:page')
  @UseGuards(AuthGuard())
  findOne(
    @Param('user_id') user_id: string,
    @Param('store_id') store_id: string,
    @Param('page') page: number,
    @GetUser(userPipe) user,
  ) {
    return this.feedbackService.getFeedbacks(user_id, store_id, page);
  }

  @Get('bookmark/:user_id')
  getTotalCount(@Param('user_id') user_id: string) {
    return this.feedbackService.getFeedBookCount(user_id);
  }
}
