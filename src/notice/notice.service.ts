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
    const viewCount = 20;
    const startCount = (page - 1) * viewCount;
    if (ct2 === 'all') ct2 = '%%';
    const result = {
      total_count: 0,
      isEnd: false,
      notice: null,
    };
    const totalCount = await this.noticeMapper.getTotalCount(ct1, ct2);
    result['total_count'] = totalCount['count'];
    if (totalCount['count'] - viewCount * page <= 0) result['isEnd'] = true;
    result['notice'] = await this.noticeMapper.findNotice(
      ct1,
      ct2,
      viewCount,
      startCount,
    );
    return result;
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
