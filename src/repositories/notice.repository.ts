import { Notice } from 'src/entities/notice.entity';
import { DataSource } from 'typeorm';

export const noticeRepository = [
  {
    provide: 'NOTICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Notice),
    inject: ['DATA_SOURCE'],
  },
];
