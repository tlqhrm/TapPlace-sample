import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreatePayDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsString()
  pay: string;

  @Allow()
  key: string;
}
