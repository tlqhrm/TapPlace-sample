import { Injectable } from '@nestjs/common';
import { CreatePaylistDto } from './dto/create-paylist.dto';
import { UpdatePaylistDto } from './dto/update-paylist.dto';

@Injectable()
export class PaylistService {
  create(createPaylistDto: CreatePaylistDto) {
    return 'This action adds a new paylist';
  }

  findAll() {
    return `This action returns all paylist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paylist`;
  }

  update(id: number, updatePaylistDto: UpdatePaylistDto) {
    return `This action updates a #${id} paylist`;
  }

  remove(id: number) {
    return `This action removes a #${id} paylist`;
  }
}
