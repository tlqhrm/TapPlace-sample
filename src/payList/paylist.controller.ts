import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaylistService } from './paylist.service';
import { CreatePaylistDto } from './dto/create-paylist.dto';
import { UpdatePaylistDto } from './dto/update-paylist.dto';

@Controller('paylist')
export class PaylistController {
  constructor(private readonly paylistService: PaylistService) {}

  @Post()
  create(@Body() createPaylistDto: CreatePaylistDto) {
    return this.paylistService.create(createPaylistDto);
  }

  @Get()
  findAll() {
    return this.paylistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paylistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaylistDto: UpdatePaylistDto) {
    return this.paylistService.update(+id, updatePaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paylistService.remove(+id);
  }
}
