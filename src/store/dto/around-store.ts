import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class AroundStoreDto {
  @IsNotEmpty()
  @IsString()
  x1: string;

  @IsNotEmpty()
  @IsString()
  y1: string;

  @IsNotEmpty()
  @IsNumber()
  distance: string;

  @IsArray()
  pays: string[];

  @IsUUID()
  user_id: string;
}
