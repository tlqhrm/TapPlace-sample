import { HttpException, Inject } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { GetPaysCehckDto } from 'src/pay/dto/get-pays-check.dto';
import { Repository } from 'typeorm';
import { AroundStoreDto } from './dto/around-store';
import { CreateStoreDto } from './dto/create-store';

export class StoreMapper {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,
  ) {}

  // 주변찾기 쿼리
  async aroundStore(aroundStoreDto: AroundStoreDto) {
    const { x1, y1, distance } = aroundStoreDto;

    const stores = await this.storeRepository
      .createQueryBuilder('store')
      .addSelect(
        `ROUND((6371*acos(cos(radians(${y1}))*cos(radians(y))*cos(radians(x) -radians(${x1}))+sin(radians(${y1}))*sin(radians(y)))),3) AS distance`,
      )
      .having(`distance <= ${distance}`)
      .orderBy('distance')
      .limit(100)
      .getRawMany();

    return stores;
  }

  // 가게 생성 쿼리
  async createStore(
    createStoreDto: CreateStoreDto | GetPaysCehckDto,
  ): Promise<Store> {
    const {
      store_id,
      place_name,
      address_name,
      road_address_name,
      category_group_name,
      phone,
      x,
      y,
    } = createStoreDto;
    const store = this.storeRepository.create({
      store_id,
      place_name,
      address_name,
      road_address_name,
      category_group_name,
      phone,
      x,
      y,
    });

    try {
      await this.storeRepository.save(store);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`store id : ${store_id} is existed`, 409);
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }

    return store;
  }

  async getStoreById(store_id: string): Promise<Store> {
    const found = await this.storeRepository.findOneBy({
      store_id: store_id,
    });
    return found;
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepository
      .createQueryBuilder('store')
      .limit(100)
      .getMany();
  }

  async deleteStore(id: string) {
    return await this.storeRepository.delete({
      store_id: id,
    });
  }
}
