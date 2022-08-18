import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  user_id: string;

  @Column({ type: 'varchar', length: 10 })
  os: string;

  @Column({ type: 'varchar', length: 12 })
  birth: string;

  @Column({ type: 'varchar', length: 4 })
  sex: string;

  @Column({ type: 'simple-array' })
  pays: string[];
}
