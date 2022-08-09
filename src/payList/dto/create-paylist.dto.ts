import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaylistDto {
  @IsNotEmpty()
  @IsString()
  pay: string;

  @Allow()
  key: string;
}
