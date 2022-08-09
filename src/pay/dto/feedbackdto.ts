import { Allow, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { FeedEnum } from 'src/enums/feed.enum';

export class FeedbackDto {
  @IsNotEmpty()
  @IsString()
  store_id: string;

  @IsNotEmpty()
  @IsString()
  pay: string;

  @IsNotEmpty()
  @IsBoolean()
  exist: boolean;

  @IsNotEmpty()
  @IsBoolean()
  feed: boolean;

  @Allow()
  key: string;
}
