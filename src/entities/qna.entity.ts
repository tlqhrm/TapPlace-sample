import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 40 })
  write_date: string;

  @Column({ type: 'varchar', length: 10 })
  os: string;

  @Column({ type: 'bool', default: false })
  answer_check: boolean;

  @Column({ type: 'varchar', length: 12 })
  store_id: string;

  @Column({ type: 'text', nullable: true })
  answer: string;
}
