import { Admin } from 'src/entities/admin.entity';
import { DataSource } from 'typeorm';

export const adminRepository = [
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
    inject: ['DATA_SOURCE'],
  },
];
