import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { PayMapper } from 'src/pay/pay.mapper';
import { AroundStoreDto } from './dto/around-store';
import { CreateStoreDto } from './dto/create-store';

import { StoreMapper } from './store.mapper';

@Injectable()
export class StoreService {
  constructor(private storeMapper: StoreMapper, private payMapper: PayMapper) {}

  // 주변찾기
  async aroundStore(aroundStoreDto: AroundStoreDto) {
    // 전달받은 pay 배열
    const { pays } = aroundStoreDto;
    // 주변 가게 먼저 가져옴
    const stores = await this.storeMapper.aroundStore(aroundStoreDto);
    // 해당 가게 stores 값 + pay 추가해서 리턴할 배열
    const result = [];

    for await (const store of stores) {
      // pays 중에 존재하는 pay만 담을 배열
      const paysResult = [];
      for await (const pay of pays) {
        // pays 존재 check
        const payExist = await this.payMapper.payCheck(store['store_id'], pay);
        if (payExist) {
          paysResult.push(pay);
        }
      }
      store['pays'] = paysResult;

      result.push(store);
    }

    return result;
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = await this.storeMapper.createStore(createStoreDto);
    return store;
  }

  async getStoreById(store_id: string): Promise<Store> {
    const store = await this.storeMapper.getStoreById(store_id);
    return store;
  }

  async findAll(): Promise<Store[]> {
    return await this.storeMapper.findAll();
  }
}
