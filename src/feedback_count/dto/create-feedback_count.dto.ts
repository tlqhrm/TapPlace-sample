import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackCountDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
