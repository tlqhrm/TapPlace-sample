import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QnaService } from './qna.service';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { adminPipe } from 'src/auth/auth.pipe';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  create(@Body() createQnaDto: CreateQnaDto, @keyCheck(keyPipe) key) {
    return this.qnaService.createQna(createQnaDto);
  }

  @Get(':category/:answer_check/:page')
  find(
    @Param('category') ct: string,
    @Param('answer_check') answer_check: string,
    @Param('page') page: number,
  ) {
    return this.qnaService.findQna(ct, answer_check, page);
  }

  @Patch(':num')
  update(
    @Param('num') num: number,
    @Body() updateQnaDto: UpdateQnaDto,
    @keyCheck(keyPipe) key,
  ) {
    return this.qnaService.updateQna(num, updateQnaDto);
  }

  @Delete(':num')
  delete(@Param('num') num: number, @Body('user_id') user_id: string) {
    return this.qnaService.deleteQna(num, user_id);
  }
}
