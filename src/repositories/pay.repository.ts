import { Pay } from 'src/entities/pay.entity';
import { AppleJcb } from 'src/entities/pays/apple_jcb.entity';
import { DataSource } from 'typeorm';

export const payRepository = [
  {
    provide: 'PAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pay),
    inject: ['DATA_SOURCE'],
  },
];
