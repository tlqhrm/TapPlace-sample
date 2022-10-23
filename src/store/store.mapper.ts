import { Inject } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { HandleSqlError } from 'src/exception/handleSqlError.decorator';
import { Repository, QueryRunner } from 'typeorm';
import { AroundStoreDto } from './dto/around-store';
import { CreateStoreDto } from './dto/create-store';

export class StoreMapper {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,
    @Inject('DATA_SOURCE')
    private queryRunner: QueryRunner,
  ) {}

  // 아이디에 맞는 store 가져옴
  @HandleSqlError
  async getStoreById(store_id: string): Promise<Store> {
    const found = await this.storeRepository.findOneBy({
      store_id: store_id,
    });

    return found;
  }

  // store 생성 쿼리
  @HandleSqlError
  async createStore(createStoreDto: CreateStoreDto): Promise<boolean> {
    await this.storeRepository
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values(createStoreDto)
      .execute();
    return true;
  }

  // 주변찾기 쿼리
  // 사용자위치의 distance 안에있는 store 중 pays 조건에맞는 스토어를 가져오고 user_id와 bookmark 테이블을 조회해 user의 해당 store 북마크 여부 표시
  @HandleSqlError
  async aroundStore(aroundStoreDto: AroundStoreDto): Promise<any> {
    const { x1, y1, distance, pays, user_id } = aroundStoreDto;
    const paysToString = pays.map((pay) => `'${pay}'`).join(',');
    const stores = await this.queryRunner.query(`
      select sp.*, b.user_id as isBookmark
      from(
        select s.*,GROUP_CONCAT(p.pay) as pays
        from(
          select *,ROUND((6371*acos(cos(radians(${y1}))*cos(radians(y))*cos(radians(x) -radians(${x1}))+sin(radians(${y1}))*sin(radians(y)))),3) AS distance
          from store
          having distance <= ${distance}
          ) s
        left join pay p on s.store_id = p.store_id AND 
        p.pay IN (${paysToString})
        GROUP by s.store_id
        order by distance
        ) sp
      left join bookmark b
      on sp.store_id = b.store_id AND b.user_id = '${user_id}' limit 500;
      `);

    return stores;
  }
}
