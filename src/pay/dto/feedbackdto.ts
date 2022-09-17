import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FeedbackDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsArray()
  user_feedback;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @Allow()
  key: string;
}
