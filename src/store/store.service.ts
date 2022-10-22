import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { AroundStoreDto } from './dto/around-store';
import { CreateStoreDto } from './dto/create-store';

import { StoreMapper } from './store.mapper';

@Injectable()
export class StoreService {
  constructor(private readonly storeMapper: StoreMapper) {}

  async getStoreById(store_id: string): Promise<Store> {
    const store = await this.storeMapper.getStoreById(store_id);
    return store;
  }

  async findAll(): Promise<Store[]> {
    return await this.storeMapper.findAll();
  }

  async create(createStoreDto: CreateStoreDto): Promise<boolean> {
    const store = await this.storeMapper.createStore(createStoreDto);
    return store;
  }

  async aroundStore(aroundStoreDto: AroundStoreDto): Promise<any> {
    const stores = await this.storeMapper.aroundStore(aroundStoreDto);
    stores.map((store) => {
      store['pays'] = store['pays'].split(',');
      if (store['isBookmark']) store['isBookmark'] = true;
      else store['isBookmark'] = false;
    });
    return {
      stores,
    };
  }
}
