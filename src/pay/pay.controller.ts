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
import { keyCheck } from 'src/keyCheck-decorators';
import { keyPipe } from 'src/keyPipes';
import { FeedbackDto } from './dto/feedbackdto';
import { GetPaysCehckDto } from './dto/get-pays-check.dto';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @HttpCode(200)
  @Post('/list')
  async getPays(@Body() getPaysDto: GetPaysDto, @keyCheck(keyPipe) key) {
    return await this.payService.getPays(getPaysDto);
  }

  @HttpCode(200)
  @Post('/list/check')
  async getPaysCehck(
    @Body() getPaysCehckDto: GetPaysCehckDto,
    @keyCheck(keyPipe) key,
  ) {
    return await this.payService.getPaysCheck(getPaysCehckDto);
  }

  @Patch('feedback')
  async feedback(
    @Body() feedbackDto: FeedbackDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    return await this.payService.feedBack(feedbackDto);
  }

  //dev

  @Post()
  async createPay(
    @Body() createPayDto: CreatePayDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    return await this.payService.createPay(createPayDto);
  }

  @Get(':id')
  getPaysbyId(@Param('id') id: string) {
    return this.payService.getPaysById(id);
  }

  @Delete(':id')
  deletePay(
    @Param('id') id: string,
    @Body('pay') pay: string,
    @keyCheck(keyPipe) key,
  ) {
    return this.payService.deletePay(id, pay);
  }
}
