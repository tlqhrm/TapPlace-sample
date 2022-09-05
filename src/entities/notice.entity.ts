import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 40 })
  write_date: string;

  @Column({ type: 'varchar', length: 20 })
  category1: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  category2: string;
}
