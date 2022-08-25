import { Injectable } from '@nestjs/common';
import { PayList } from 'src/entities/paylist.entity';
import { CreatePaylistDto } from './dto/create-paylist.dto';
import { UpdatePaylistDto } from './dto/update-paylist.dto';
import { PayListMapper } from './paylist.mapper';

@Injectable()
export class PaylistService {
  constructor(private payListMapper: PayListMapper) {}
  async create(createPaylistDto: CreatePaylistDto): Promise<boolean> {
    return await this.payListMapper.create(createPaylistDto);
  }

  async findAll(): Promise<string[]> {
    return await this.payListMapper.findAllPayList();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} paylist`;
  // }

  // update(id: number, updatePaylistDto: UpdatePaylistDto) {
  //   return `This action updates a #${id} paylist`;
  // }

  async remove(pay: string): Promise<boolean> {
    return await this.payListMapper.remove(pay);
  }
}
