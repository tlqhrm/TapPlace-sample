import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Terms } from 'src/entities/terms.entity';
import { Repository } from 'typeorm';
import { CreateTermDto } from './dto/create-term.dto';

@Injectable()
export class TermsMapper {
  constructor(
    @Inject('TERMS_REPOSITORY') private termsRepository: Repository<Terms>,
  ) {}

  async createTerms(createTermsDto: CreateTermDto) {
    const { personal_date, service_date } = createTermsDto;
    const result = await this.termsRepository
      .createQueryBuilder()
      .insert()
      .into(Terms)
      .values({
        personal_date,
        service_date,
        regist_date: () => `left(NOW(),19)`,
      })
      .execute();

    return true;
  }

  async findAllTerms() {
    const result = await this.termsRepository
      .createQueryBuilder()
      .select('*')
      .getRawMany();

    return result;
  }

  async findOne(num) {
    const result = await this.termsRepository
      .createQueryBuilder()
      .select('*')
      .where(`num = ${num}`)
      .getRawMany();

    return result;
  }

  async update(num, updateTermDto) {
    const { personal_date, service_date } = updateTermDto;
    const set = {};
    for (const element in updateTermDto) {
      console.log(updateTermDto[element]);
      if (element != null) set[element] = updateTermDto[element];
    }
    const result = await this.termsRepository
      .createQueryBuilder()
      .update(Terms)
      .set(set)
      .where(`num = ${num}`)
      .execute();

    return true;
  }

  async remove(num) {
    const result = await this.termsRepository
      .createQueryBuilder()
      .delete()
      .where(`num = ${num}`)
      .execute();

    return true;
  }

  async findLast() {
    const result = await this.termsRepository
      .createQueryBuilder()
      .select(['personal_date', 'service_date'])
      .orderBy('num', 'DESC')
      .getRawOne();

    return result;
  }
}
