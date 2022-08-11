import { ConlessVisa } from 'src/entities/pays/conless_visa.entity';
import { DataSource } from 'typeorm';

export const conlessVisaRepository = [
  {
    provide: 'CONLESS_VISA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConlessVisa),
    inject: ['DATA_SOURCE'],
  },
];
