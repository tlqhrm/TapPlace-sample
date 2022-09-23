import { Allow, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetPaysDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @IsString()
  user_id: string;
  // @Allow()
  // key: string;
}
