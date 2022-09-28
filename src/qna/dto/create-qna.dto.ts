import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQnaDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  // @IsString()
  // write_date: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @Allow()
  answer_check: boolean;

  @IsString()
  store_id: string;

  @IsOptional()
  @IsString()
  answer: string;
}
