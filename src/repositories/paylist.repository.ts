import { PayList } from 'src/entities/paylist.entity';
import { DataSource } from 'typeorm';

export const paylistRepository = [
  {
    provide: 'PAYLIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PayList),
    inject: ['DATA_SOURCE'],
  },
];
