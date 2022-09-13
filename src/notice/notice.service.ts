import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticeMapper } from './notice.mapper';

@Injectable()
export class NoticeService {
  constructor(private noticeMapper: NoticeMapper) {}

  async create(createNoticeDto: CreateNoticeDto) {
    return await this.noticeMapper.createNotice(createNoticeDto);
  }

  async findNotice(ct1, ct2, page) {
    if (ct2 === 'all') ct2 = '%%';
    return await this.noticeMapper.findNotice(ct1, ct2, page);
  }

  async updateNotice(num: number, updateNoticeDto: UpdateNoticeDto) {
    return await this.noticeMapper.updateNotice(num, updateNoticeDto);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} notice`;
  // }

  async removeNotice(num: number) {
    return await this.noticeMapper.removeNotice(num);
  }
}
