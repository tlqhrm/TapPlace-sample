import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  place_name: string;

  @IsNotEmpty()
  @IsString()
  address_name: string;

  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  x: string;

  @IsNotEmpty()
  @IsString()
  y: string;

  key: string;
}
