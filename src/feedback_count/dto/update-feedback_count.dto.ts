import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackCountDto } from './create-feedback_count.dto';

export class UpdateFeedbackCountDto extends PartialType(CreateFeedbackCountDto) {}
