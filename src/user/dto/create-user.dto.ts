import {
  Allow,
  IsArray,
  IsBoolean,
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

  @IsString()
  birth: string;

  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

  @Allow()
  key: string;

  @IsNotEmpty()
  @IsBoolean()
  marketing_agree: boolean;

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
