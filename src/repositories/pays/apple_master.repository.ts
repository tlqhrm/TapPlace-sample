import { AppleMaster } from 'src/entities/pays/apple_master.entity';
import { DataSource } from 'typeorm';

export const appleMasterRepository = [
  {
    provide: 'APPLE_MASTER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AppleMaster),
    inject: ['DATA_SOURCE'],
  },
];
