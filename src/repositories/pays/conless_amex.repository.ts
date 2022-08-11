import { ConlessAmex } from 'src/entities/pays/conless_amex.entity';
import { DataSource } from 'typeorm';

export const conlessAmexRepository = [
  {
    provide: 'CONLESS_AMEX_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConlessAmex),
    inject: ['DATA_SOURCE'],
  },
];
