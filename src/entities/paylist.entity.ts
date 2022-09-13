import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PayList {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  pay: string;
}
