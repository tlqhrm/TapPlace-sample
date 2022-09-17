import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeedbackCount {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'int' })
  count: number;
}
