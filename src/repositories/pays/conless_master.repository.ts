import { ConlessMaster } from 'src/entities/pays/conless_master.entity';
import { DataSource } from 'typeorm';

export const conlessMasterRepository = [
  {
    provide: 'CONLESS_MASTER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConlessMaster),
    inject: ['DATA_SOURCE'],
  },
];
