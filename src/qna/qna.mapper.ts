import { HttpException, Inject, Injectable } from '@nestjs/common';
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
    const result = {};
    result['qna'] = await this.qnaRepository
      .createQueryBuilder()
      .select(`*`)
      .where(`(category = ${ct})`)
      .andWhere(`(answer_check = ${asnwer_check})`)
      .orderBy('num', 'DESC')
      .limit(10)
      .offset(startCount)
      .getRawMany();
    return await Object.assign(
      await this.qnaRepository
        .createQueryBuilder('notice')
        .select('count(*) as totalCount')
        .where(`(category = ${ct})`)
        .andWhere(`(answer_check = ${asnwer_check})`)
        .getRawOne(),
      result,
    );
  }

  async updateQna(num, updateQnaDto) {
    const set = {};
    const id = updateQnaDto['user_id'];
    for (const element in updateQnaDto) {
      if (element === 'user_id') continue;
      if (element === 'key') continue;
      if (updateQnaDto[element] != null) set[element] = updateQnaDto[element];
    }
    // console.log(set);
    const result = await this.qnaRepository
      .createQueryBuilder()
      .update(Qna)
      .set(set)
      .where(`num = ${num} AND user_id = '${id}'`)
      .execute();

    if (!result['affected'])
      throw new HttpException('조건에 맞는 게시글이 없습니다.', 400);
    return true;
  }

  async deleteQna(num, user_id) {
    const result = await this.qnaRepository
      .createQueryBuilder()
      .delete()
      .where(`num = ${num} AND user_id = '${user_id}'`)
      .execute();
    if (!result['affected'])
      throw new HttpException('조건에 맞는 게시글이 없습니다.', 400);
    return true;
  }
}
