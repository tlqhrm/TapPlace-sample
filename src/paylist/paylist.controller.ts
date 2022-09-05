import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpStatus,
  Res,
  Req,
  Logger,
} from '@nestjs/common';
import { PaylistService } from './paylist.service';
import { CreatePaylistDto } from './dto/create-paylist.dto';
import { UpdatePaylistDto } from './dto/update-paylist.dto';
import { PayList } from 'src/entities/paylist.entity';
import { Request } from 'express';
import { keyCheck, keyCheck2 } from 'src/auth/keyCheck-decorators';
import { keyPipe, keyPipe2 } from 'src/auth/keyPipes';

@Controller('paylist')
export class PaylistController {
  constructor(private readonly paylistService: PaylistService) {}

  @Post()
  async create(
    @Body() createPaylistDto: CreatePaylistDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    return await this.paylistService.create(createPaylistDto);
  }

  @Get()
  async findAll(): Promise<object> {
    // Logger.warn('asdasd');
    return await this.paylistService.findAll();
  }

  // @Get()
  // async findAll(@Req() req: Request) {
  //   console.log
  // }

  @Delete(':pay')
  async remove(
    @Param('pay') pay: string,
    @keyCheck2(keyPipe2) key,
  ): Promise<boolean> {
    return this.paylistService.remove(pay);
    // return this.paylistService.remove(pay);
  }
}
