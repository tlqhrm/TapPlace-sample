import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  // @Get()
  // findAll() {
  //   return this.noticeService.findAll();
  // }

  @Get(':category1/:category2/:page')
  findOne(
    @Param('category1') ct1: string,
    @Param('category2') ct2: string,
    @Param('page') page: number,
  ) {
    return this.noticeService.findNotice(ct1, ct2, page);
  }

  @Patch(':num')
  update(@Param('num') num: number, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.updateNotice(num, updateNoticeDto);
  }

  @Delete(':num')
  remove(@Param('num') num: number) {
    return this.noticeService.removeNotice(num);
  }
}
