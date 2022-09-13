import { Terms } from 'src/entities/terms.entity';
import { DataSource } from 'typeorm';

export const termsRepository = [
  {
    provide: 'TERMS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Terms),
    inject: ['DATA_SOURCE'],
  },
];
