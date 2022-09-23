import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMarketingDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsBoolean()
  marketing_agree: boolean;
}
