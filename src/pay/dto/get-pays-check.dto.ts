import { Allow, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetPaysCehckDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsString()
  place_name: string;

  @IsNotEmpty()
  @IsString()
  address_name: string;

  @IsString()
  road_address_name: string;

  @IsString()
  category_group_name: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  x: string;

  @IsNotEmpty()
  @IsString()
  y: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @IsString()
  user_id: string;

  // @Allow()
  // key: string;
}
