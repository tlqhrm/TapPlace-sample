import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  user_id: string;

  @Column({ type: 'varchar', length: 12 })
  store_id: string;

  @Column({ type: 'varchar', length: 40, default: () => `left(NOW(),19)` })
  date: string;

  @Column({ type: 'varchar' })
  feedback: string;
}
