import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kakaopay {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 12, unique: true })
  store_id: string;

  @Column({ type: 'int' })
  success: number;

  @Column({ type: 'int' })
  fail: number;

  @Column({ type: 'varchar', length: 10 })
  last_state: string;

  @Column({ type: 'varchar', length: 40 })
  last_time: string;
}
