import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  admin_id: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 12 })
  role: string;

  @Column({ type: 'varchar', length: 40 })
  regist_date: string;
}
