import { Allow, IsNotEmpty, IsString } from 'class-validator';

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
