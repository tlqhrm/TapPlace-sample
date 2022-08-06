import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 10 })
  os: string;

  @Column({ type: 'varchar', length: 12 })
  birth: string;

  @Column({ type: 'simple-array' })
  pay: string[];
}
