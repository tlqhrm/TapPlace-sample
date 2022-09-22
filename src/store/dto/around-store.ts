import {
  IsNotEmpty,
  IsString,
  Allow,
  IsArray,
  IsNumber,
  IsOptional,
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

  @IsString()
  user_id: string;
  // @Allow()
  // key: string;
}
