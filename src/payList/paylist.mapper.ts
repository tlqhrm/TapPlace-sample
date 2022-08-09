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

  async findAllPayList(): Promise<PayList[]> {
    return await this.payListRepository
      .createQueryBuilder('pay_list')
      .getMany();
  }

  async remove(pay: string): Promise<boolean> {
    const del = await this.payListRepository.delete(pay);
    return del ? true : false;
  }
}
