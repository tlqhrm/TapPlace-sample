import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @Allow()
  answer_check: boolean;

  @Allow()
  key: string;
}
