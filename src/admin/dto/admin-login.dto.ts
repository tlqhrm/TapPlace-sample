import { IsString } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  admin_id: string;

  @IsString()
  password: string;
}
