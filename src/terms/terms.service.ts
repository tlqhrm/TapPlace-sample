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

  findAll() {
    return this.termsMapper.findAllTerms();
  }

  findOne(num: number) {
    return this.termsMapper.findOne(num);
  }

  update(num: number, updateTermDto: UpdateTermDto) {
    return this.termsMapper.update(num, updateTermDto);
  }

  remove(num: number) {
    return this.termsMapper.remove(num);
  }
}
