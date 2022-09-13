import { GoogleMaster } from 'src/entities/pays/google_master.entity';
import { DataSource } from 'typeorm';

export const googleMasterRepository = [
  {
    provide: 'GOOGLE_MASTER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GoogleMaster),
    inject: ['DATA_SOURCE'],
  },
];
