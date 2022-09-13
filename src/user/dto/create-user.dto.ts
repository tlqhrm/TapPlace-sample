import { Allow, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsNotEmpty()
  @IsString()
  birth: string;

  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @Allow()
  key: string;
}
