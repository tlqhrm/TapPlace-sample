import { Injectable } from '@nestjs/common';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { QnaMapper } from './qna.mapper';

@Injectable()
export class QnaService {
  constructor(private readonly qnaMapper: QnaMapper) {}
  async createQna(createQnaDto: CreateQnaDto) {
    return await this.qnaMapper.createQna(createQnaDto);
  }

  async findQna(ct: string, answer_check, page: number) {
    if (ct === 'all') ct = `'qna' OR category = 'edit'`;
    else ct = `'${ct}'`;
    if (answer_check === 'all') answer_check = 'true OR answer_check = false';

    const viewCount = 20;
    const startCount = (page - 1) * viewCount;
    const result = {
      total_count: 0,
      isEnd: false,
      qna: null,
    };
    const totalCount = await this.qnaMapper.getTotalCount(ct, answer_check);
    console.log(totalCount);
    result['total_count'] = totalCount['count'];
    if (totalCount['count'] - viewCount * page <= 0) result['isEnd'] = true;
    result['qna'] = await this.qnaMapper.findQna(
      ct,
      answer_check,
      viewCount,
      startCount,
    );

    return result;
  }

  async updateQna(num: number, updateQnaDto: UpdateQnaDto) {
    return await this.qnaMapper.updateQna(num, updateQnaDto);
  }

  async deleteQna(num: number, user_id) {
    return this.qnaMapper.deleteQna(num, user_id);
  }
}
