import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
} from '@nestjs/common';
import { StoreService } from './store.service';

import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    if (createStoreDto.key !== process.env.KEY) {
      throw new HttpException('Unable to access.', 403);
    }
    return this.storeService.create(createStoreDto);
  }

  @Get(':id')
  fineOne(@Param('id') id: string) {
    return this.storeService.getStoreById(id);
  }
}
