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

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  create(@Body() createQnaDto: CreateQnaDto) {
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
  @UseGuards(AuthGuard())
  @Patch(':num')
  update(
    @Param('num') num: number,
    @Body() updateQnaDto: UpdateQnaDto,
    @GetUser(adminPipe) admin,
  ) {
    return this.qnaService.updateQna(num, updateQnaDto);
  }

  // @Delete(':num')
  // @UseGuards(AuthGuard())
  // remove(@Param('num') num: number, @GetUser(adminPipe) admin) {
  //   return this.qnaService.removeQna(num);
  // }
}
