import { ConlessJcb } from 'src/entities/pays/conless_jcb.entity';
import { DataSource } from 'typeorm';

export const conlessJcbRepository = [
  {
    provide: 'CONLESS_JCB_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConlessJcb),
    inject: ['DATA_SOURCE'],
  },
];
