import { Qna } from 'src/entities/qna.entity';
import { DataSource } from 'typeorm';

export const qnaRepository = [
  {
    provide: 'QNA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Qna),
    inject: ['DATA_SOURCE'],
  },
];
