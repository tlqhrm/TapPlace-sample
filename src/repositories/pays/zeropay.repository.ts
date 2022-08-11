import { Zeropay } from 'src/entities/pays/zeropay.entity';
import { DataSource } from 'typeorm';

export const zeropayRepository = [
  {
    provide: 'ZEROPAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Zeropay),
    inject: ['DATA_SOURCE'],
  },
];
