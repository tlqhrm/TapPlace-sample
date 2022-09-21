import { Inject, Injectable } from '@nestjs/common';
import { Notice } from 'src/entities/notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Injectable()
export class NoticeMapper {
  constructor(
    @Inject('NOTICE_REPOSITORY')
    private noticeRepository: Repository<Notice>,
  ) {}
  //notice 만드는 쿼리
  async createNotice(createNoticeDto: CreateNoticeDto): Promise<any> {
    const { title, content, category1, category2 } = createNoticeDto;

    const result = await this.noticeRepository
      .createQueryBuilder()
      .insert()
      .into(Notice)
      .values({
        title,
        content,
        category1,
        category2,
        write_date: () => 'left(NOW(),19)',
      })
      .execute();

    return true;
  }

  async findNotice(ct1, ct2, viewCount, startCount) {
    const result = {
      notice: [],
    };
    result['notice'] = await this.noticeRepository
      .createQueryBuilder()
      .select(`*`)
      .where(`category1 = '${ct1}'`)
      .andWhere(`category2 LIKE '${ct2}'`)
      .orderBy('num', 'DESC')
      .limit(viewCount)
      .offset(startCount)
      .getRawMany();
    return result;
  }
  async getTotalCount(ct1, ct2) {
    return await this.noticeRepository
      .createQueryBuilder('notice')
      .select('count(*) as count')
      .where(`category1 = '${ct1}'`)
      .andWhere(`category2 LIKE '${ct2}'`)
      .getRawOne();
  }

  async updateNotice(num, updateNoticeDto) {
    // const { title, content, category1, category2 } = updateNoticeDto;
    const set = {};
    for (const element in updateNoticeDto) {
      // console.log(updateNoticeDto[element]);
      if (element != null) set[element] = updateNoticeDto[element];
    }
    const result = await this.noticeRepository
      .createQueryBuilder()
      .update(Notice)
      .set(set)
      .where(`num = ${num}`)
      .execute();
    return true;
  }

  async removeNotice(num) {
    const result = await this.noticeRepository
      .createQueryBuilder()
      .delete()
      .where(`num = ${num}`)
      .execute();

    return true;
  }
}
