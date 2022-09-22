import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { GetPaysDto } from './dto/get-pays.dto';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';
import { FeedbackDto } from './dto/feedbackdto';
import { GetPaysCehckDto } from './dto/get-pays-check.dto';
import { GetPaysMoreDto } from './dto/get-pays-more.dto';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @HttpCode(200)
  @Post('/list')
  async getPays(@Body() getPaysDto: GetPaysDto) {
    return await this.payService.getPays(getPaysDto, false);
  }
  @HttpCode(200)
  @Post('/list/more')
  async getPaysMore(@Body() GetPaysMoreDto: GetPaysMoreDto) {
    return await this.payService.getPaysMore(GetPaysMoreDto);
  }

  @HttpCode(200)
  @Post('/list/check')
  async getPaysCehck(@Body() getPaysCehckDto: GetPaysCehckDto) {
    return await this.payService.getPaysCheck(getPaysCehckDto);
  }

  @Patch('feedback')
  async feedback(
    @Body() feedbackDto: FeedbackDto,
    @keyCheck(keyPipe) key,
  ): Promise<any[]> {
    return await this.payService.feedBack(feedbackDto);
  }

  // @Patch('feedback2')
  // async feedback2(
  //   @Body() feedbackDto: FeedbackDto,
  //   @keyCheck(keyPipe) key,
  // ): Promise<any[]> {
  //   return await this.payService.feedBack2(feedbackDto);
  // }

  //dev

  // @Post()
  // async createPay(
  //   @Body() createPayDto: CreatePayDto,
  //   @keyCheck(keyPipe) key,
  // ): Promise<boolean> {
  //   return await this.payService.createPay(createPayDto);
  // }

  // @Get(':id')
  // getPaysbyId(@Param('id') id: string) {
  //   return this.payService.getPaysById(id);
  // }

  // @Delete(':id')
  // deletePay(
  //   @Param('id') id: string,
  //   @Body('pay') pay: string,
  //   @keyCheck(keyPipe) key,
  // ) {
  //   return this.payService.deletePay(id, pay);
  // }
}
