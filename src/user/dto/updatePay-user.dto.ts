import { Allow, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPaysDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @Allow()
  key: string;
}
