import { GoogleVisa } from 'src/entities/pays/google_visa.entity';
import { DataSource } from 'typeorm';

export const googleVisaRepository = [
  {
    provide: 'GOOGLE_VISA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GoogleVisa),
    inject: ['DATA_SOURCE'],
  },
];
