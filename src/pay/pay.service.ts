import { Injectable } from '@nestjs/common';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { PayMapper } from './pay.mapper';

@Injectable()
export class PayService {
  constructor(private payMapper: PayMapper) {}
  create(createPayDto: CreatePayDto) {
    return this.payMapper.createPay(createPayDto);
  }

  // findAll() {
  //   return `This action returns all pay`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pay`;
  // }

  // update(id: number, updatePayDto: UpdatePayDto) {
  //   return `This action updates a #${id} pay`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pay`;
  // }
}
