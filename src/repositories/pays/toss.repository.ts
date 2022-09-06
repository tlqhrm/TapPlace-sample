import { Toss } from 'src/entities/pays/toss.entity';
import { DataSource } from 'typeorm';

export const tossRepository = [
  {
    provide: 'TOSS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Toss),
    inject: ['DATA_SOURCE'],
  },
];
