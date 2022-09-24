import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserlogDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
