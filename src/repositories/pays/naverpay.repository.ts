import { Naverpay } from 'src/entities/pays/naverpay.entity';
import { DataSource } from 'typeorm';

export const naverPayRepository = [
  {
    provide: 'NAVERPAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Naverpay),
    inject: ['DATA_SOURCE'],
  },
];
