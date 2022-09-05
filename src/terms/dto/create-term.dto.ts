import { IsNotEmpty } from 'class-validator';

export class CreateTermDto {
  @IsNotEmpty()
  personal_date: string;

  @IsNotEmpty()
  service_date: string;
}
