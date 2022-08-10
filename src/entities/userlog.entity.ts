import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 40,
    default: () => `left(NOW(),19)`,
  })
  time: string;
}
