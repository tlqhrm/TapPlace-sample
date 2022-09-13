import { Store } from 'src/entities/store.entity';
import { DataSource } from 'typeorm';

export const storeRepository = [
  {
    provide: 'STORE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Store),
    inject: ['DATA_SOURCE'],
  },
];
