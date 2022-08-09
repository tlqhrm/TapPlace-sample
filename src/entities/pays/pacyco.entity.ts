import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payco {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 12, unique: true })
  store_id: string;

  @Column({ type: 'int', default: 0 })
  success: number;

  @Column({ type: 'int', default: 0 })
  fail: number;

  @Column({ type: 'varchar', length: 10, default: '' })
  last_state: string;

  @Column({ type: 'varchar', length: 40, default: '' })
  last_time: string;
}
