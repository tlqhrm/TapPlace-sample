import {
  Allow,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  birth: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @Allow()
  key: string;

  @IsNotEmpty()
  @IsString()
  personal_date: string;

  @IsNotEmpty()
  @IsString()
  service_date: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  token: string;
}
