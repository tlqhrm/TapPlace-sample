import { AppleVisa } from 'src/entities/pays/apple_visa.entity';
import { DataSource } from 'typeorm';

export const appleVisaRepository = [
  {
    provide: 'APPLE_VISA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AppleVisa),
    inject: ['DATA_SOURCE'],
  },
];
