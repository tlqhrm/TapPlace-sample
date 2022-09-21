import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  user_id: string;

  @Column({ type: 'varchar', length: 10 })
  os: string;

  @Column({ type: 'varchar', length: 12, default: '' })
  birth: string;

  @Column({ type: 'varchar', length: 4, default: '' })
  sex: string;

  @Column({ type: 'simple-array' })
  pays: string[];

  @Column({ type: 'varchar', length: 200, default: '' })
  token: string;

  @Column({ type: 'varchar', length: 40 })
  personal_date: string;

  @Column({ type: 'varchar', length: 40 })
  service_date: string;

  @Column({ type: 'varchar', length: 40 })
  marketing_date: string;

  @Column({ type: 'boolean' })
  marketing_agree: boolean;
}
