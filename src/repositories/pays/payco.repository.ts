import { Payco } from 'src/entities/pays/pacyco.entity';
import { DataSource } from 'typeorm';

export const paycoRepository = [
  {
    provide: 'PAYCO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Payco),
    inject: ['DATA_SOURCE'],
  },
];
