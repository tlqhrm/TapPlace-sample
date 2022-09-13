import { UserLog } from 'src/entities/userlog.entity';
import { DataSource } from 'typeorm';

export const userLogRepository = [
  {
    provide: 'USERLOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserLog),
    inject: ['DATA_SOURCE'],
  },
];
