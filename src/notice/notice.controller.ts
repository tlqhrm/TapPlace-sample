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
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { adminPipe } from 'src/auth/auth.pipe';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createNoticeDto: CreateNoticeDto, @GetUser(adminPipe) admin) {
    return this.noticeService.create(createNoticeDto);
  }

  @Get(':category1/:category2/:page')
  find(
    @Param('category1') ct1: string,
    @Param('category2') ct2: string,
    @Param('page') page: number,
  ) {
    return this.noticeService.findNotice(ct1, ct2, page);
  }

  @Patch(':num')
  @UseGuards(AuthGuard())
  update(
    @Param('num') num: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
    @GetUser(adminPipe) admin,
  ) {
    return this.noticeService.updateNotice(num, updateNoticeDto);
  }

  @Delete(':num')
  @UseGuards(AuthGuard())
  remove(@Param('num') num: number, @GetUser(adminPipe) admin) {
    return this.noticeService.removeNotice(num);
  }
}
