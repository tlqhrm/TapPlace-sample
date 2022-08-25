import { Inject } from '@nestjs/common';
import { PayList } from 'src/entities/paylist.entity';
import { Repository } from 'typeorm';
import { CreatePaylistDto } from './dto/create-paylist.dto';

export class PayListMapper {
  constructor(
    @Inject('PAYLIST_REPOSITORY')
    private payListRepository: Repository<PayList>,
  ) {}

  async create(createPaylistDto: CreatePaylistDto): Promise<boolean> {
    const { pay } = createPaylistDto;

    const payList = this.payListRepository.create({
      pay,
    });

    const commit = await this.payListRepository.save(payList);
    return commit ? true : false;
  }

  async findAllPayList(): Promise<string[]> {
    const result = [];
    const payList = await this.payListRepository.find();

    for (const pay of payList) {
      result.push(pay['pay']);
    }

    return result;
  }

  async remove(pay: string): Promise<boolean> {
    const del = await this.payListRepository.delete(pay);
    return del ? true : false;
  }
}
