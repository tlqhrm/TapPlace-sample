import { ConlessUnion } from 'src/entities/pays/conless_union.entity';
import { DataSource } from 'typeorm';

export const conlessUnionRepository = [
  {
    provide: 'CONLESS_UNION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConlessUnion),
    inject: ['DATA_SOURCE'],
  },
];
