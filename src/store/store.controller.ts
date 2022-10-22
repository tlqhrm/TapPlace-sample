import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';

import { AroundStoreDto } from './dto/around-store';
import { CreateStoreDto } from './dto/create-store';
import { Store } from 'src/entities/store.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { adminPipe } from 'src/auth/auth.pipe';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':store_id')
  async fineOne(@Param('store_id') store_id: string) {
    return await this.storeService.getStoreById(store_id);
  }

  @Get()
  async findAll(): Promise<Store[]> {
    return await this.storeService.findAll();
  }

  @Post('around')
  @HttpCode(200)
  async aroundStore(@Body() aroundStoreDto: AroundStoreDto): Promise<boolean> {
    return await this.storeService.aroundStore(aroundStoreDto);
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @GetUser(adminPipe) admin,
  ): Promise<any> {
    return await this.storeService.create(createStoreDto);
  }
}
