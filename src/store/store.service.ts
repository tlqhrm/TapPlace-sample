import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreMapper } from './store.mapper';

@Injectable()
export class StoreService {
  constructor(private storeMapper: StoreMapper) {}
  async create(createStoreDto: CreateStoreDto): Promise<Store | string> {
    const store = await this.storeMapper.createStore(createStoreDto);
    return store;
  }

  async getStoreById(id: string): Promise<Store> {
    const store = await this.storeMapper.getStoreById(id);
    console.log(store);
    return store;
  }
}
