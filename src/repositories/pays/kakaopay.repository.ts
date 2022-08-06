import { Kakaopay } from 'src/entities/pays/kakaopay.entity';
import { DataSource } from 'typeorm';

export const kakaoPayRepository = [
  {
    provide: 'KAKAOPAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Kakaopay),
    inject: ['DATA_SOURCE'],
  },
];
