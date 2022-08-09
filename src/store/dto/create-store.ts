import { IsNotEmpty, IsString, Allow } from 'class-validator';

export class CreateStoreDto {
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
  category_group_name: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  x: string;

  @IsNotEmpty()
  @IsString()
  y: string;

  @Allow()
  key: string;
}
