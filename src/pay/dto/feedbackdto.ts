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
  feedbacks;

  @Allow()
  key: string;
}
