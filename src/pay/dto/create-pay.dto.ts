import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreatePayDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  // @IsNotEmpty()
  // @IsNumber()
  // success: number;

  // @IsNotEmpty()
  // @IsNumber()
  // fail: number;

  // @IsNotEmpty()
  // @IsString()
  // last_state: string;

  // @IsNotEmpty()
  // @IsString()
  // last_time: string;

  @IsNotEmpty()
  @IsString()
  whatPay: string;

  @Allow()
  key: string;
}
