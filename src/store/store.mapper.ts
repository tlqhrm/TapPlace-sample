import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { ExceptionHandler } from 'src/ExceptHandler';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';

export class StoreMapper {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<string | Store> {
    const { id, place_name, address_name, category_name, phone, x, y } =
      createStoreDto;
    const store = this.storeRepository.create({
      id,
      place_name,
      address_name,
      category_name,
      phone,
      x,
      y,
    });

    try {
      await this.storeRepository.save(store);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`store id : ${id} is existed`, 409);
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }

    return store;
  }
  async getStoreById(id: string): Promise<Store> {
    const found = await this.storeRepository.findOneBy({
      id,
    });
    return found;
  }
}
