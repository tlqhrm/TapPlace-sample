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

  async findNotice(ct1, ct2, page) {
    const viewCount = 10;
    const startCount = (page - 1) * viewCount;
    const result = {
      notice: [],
    };
    // result['notice'] = await this.noticeRepository
    //   .createQueryBuilder()
    //   .select(`SQL_CALC_FOUND_ROWS *`)
    //   .where(`category1 = '${ct1}'`)
    //   .andWhere(`category2 LIKE '${ct2}'`)
    //   .limit(10)
    //   .offset(startCount)
    //   .getRawMany();
    // return await Object.assign(
    //   await this.noticeRepository
    //     .createQueryBuilder('notice')
    //     .select('FOUND_ROWS() as totalCount')
    //     .getRawOne(),
    //   result,
    result['notice'] = await this.noticeRepository
      .createQueryBuilder()
      .select(`*`)
      .where(`category1 = '${ct1}'`)
      .andWhere(`category2 LIKE '${ct2}'`)
      .limit(viewCount)
      .offset(startCount)
      .getRawMany();
    return await Object.assign(
      await this.noticeRepository
        .createQueryBuilder('notice')
        .select('count(*) as totalCount')
        .where(`category1 = '${ct1}'`)
        .andWhere(`category2 LIKE '${ct2}'`)
        .getRawOne(),
      result,
    );
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
