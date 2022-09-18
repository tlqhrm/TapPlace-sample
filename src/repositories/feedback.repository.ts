import { Feedback } from 'src/entities/feedback.entity';
import { DataSource } from 'typeorm';

export const feedbackRepository = [
  {
    provide: 'FEEDBACK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Feedback),
    inject: ['DATA_SOURCE'],
  },
];
