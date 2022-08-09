import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
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

  @Post()
  async create(
    @Body() createPayDto: CreatePayDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    return await this.payService.create(createPayDto);
  }

  @Get()
  findAll() {
    return true;
  }

  @Post('/list')
  async getPays(@Body() getPaysDto: GetPaysDto, @keyCheck(keyPipe) key) {
    return await this.payService.getPays(getPaysDto);
  }

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
}
