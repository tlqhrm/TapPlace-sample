import { Inject, Injectable } from '@nestjs/common';
import { Qna } from 'src/entities/qna.entity';
import { Repository } from 'typeorm';
import { CreateQnaDto } from './dto/create-qna.dto';

@Injectable()
export class QnaMapper {
  constructor(
    @Inject('QNA_REPOSITORY')
    private qnaRepository: Repository<Qna>,
  ) {}

  async createQna(createqnaDto: CreateQnaDto): Promise<any> {
    const { user_id, category, title, content, email, os } = createqnaDto;

    const result = await this.qnaRepository
      .createQueryBuilder()
      .insert()
      .into(Qna)
      .values({
        user_id,
        category,
        title,
        content,
        email,
        os,
        write_date: () => 'left(NOW(),19)',
      })
      .execute();

    return true;
  }

  async findQna(ct, asnwer_check, page) {
    const viewCount = 10;
    const startCount = (page - 1) * viewCount;
    const result = {
      notice: [],
    };
    result['notice'] = await this.qnaRepository
      .createQueryBuilder()
      .select(`SQL_CALC_FOUND_ROWS *`)
      .where(`(category = ${ct})`)
      .andWhere(`(answer_check = ${asnwer_check})`)
      .orderBy('num', 'DESC')
      .limit(10)
      .offset(startCount)
      .getRawMany();
    return Object.assign(
      await this.qnaRepository
        .createQueryBuilder('notice')
        .select('FOUND_ROWS() as totalCount')
        .getRawOne(),
      result,
    );
  }

  async updateQna(num, updateQnaDto) {
    const set = {};
    for (const element in updateQnaDto) {
      if (element != null) set[element] = updateQnaDto[element];
    }
    const result = await this.qnaRepository
      .createQueryBuilder()
      .update(Qna)
      .set(set)
      .where(`num = ${num}`)
      .execute();
    return true;
  }
}
