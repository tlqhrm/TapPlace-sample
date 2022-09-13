import { Inject, Injectable } from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { TermsMapper } from './terms.mapper';

@Injectable()
export class TermsService {
  constructor(private termsMapper: TermsMapper) {}
  create(createTermDto: CreateTermDto) {
    return this.termsMapper.createTerms(createTermDto);
  }

  async findAll() {
    const result = {
      terms: [],
    };
    result['terms'] = await this.termsMapper.findAllTerms();
    return result;
  }

  async findOne(num: number) {
    const result = await this.termsMapper.findOne(num);

    return result[0];
  }

  async update(num: number, updateTermDto: UpdateTermDto) {
    return await this.termsMapper.update(num, updateTermDto);
  }

  async remove(num: number) {
    return await this.termsMapper.remove(num);
  }
}
