import { AppleJcb } from 'src/entities/pays/apple_jcb.entity';
import { DataSource } from 'typeorm';

export const appleJCBRepository = [
  {
    provide: 'APPLE_JCB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AppleJcb),
    inject: ['DATA_SOURCE'],
  },
];
