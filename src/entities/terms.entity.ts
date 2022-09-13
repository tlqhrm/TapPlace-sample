import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Terms {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 40 })
  personal_date: string;

  @Column({ type: 'varchar', length: 40 })
  service_date: string;

  @Column({ type: 'varchar', length: 40 })
  regist_date: string;
}
