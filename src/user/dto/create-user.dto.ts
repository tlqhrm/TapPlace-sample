import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsString()
  @Matches(
    '^(19[0-9][0-9]|20d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$',
    '',
    { message: '생년월일 형식 yyyy-MM-dd' },
  )
  birth: string;

  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsArray()
  pays: string[];

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
