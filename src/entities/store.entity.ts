import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  num: number;

  @Column({ type: 'varchar', length: 12, unique: true })
  store_id: string;

  @Column({ type: 'varchar', length: 80 })
  place_name: string;

  @Column({ type: 'varchar', length: 100 })
  address_name: string;

  @Column({ type: 'varchar', length: 100 })
  road_address_name: string;

  @Column({ type: 'varchar', length: 20 })
  category_group_name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 20 })
  x: string;

  @Column({ type: 'varchar', length: 20 })
  y: string;
}
