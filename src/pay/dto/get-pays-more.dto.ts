import { Allow, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetPaysMoreDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];
}
