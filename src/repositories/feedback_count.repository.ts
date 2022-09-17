import { FeedbackCount } from 'src/entities/feedback_count.entity';
import { DataSource } from 'typeorm';

export const feedbackCountRepository = [
  {
    provide: 'FEEDBACK_COUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FeedbackCount),
    inject: ['DATA_SOURCE'],
  },
];
