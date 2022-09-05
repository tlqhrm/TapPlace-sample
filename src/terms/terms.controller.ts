import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TermsService } from './terms.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@Controller('terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  create(@Body() createTermDto: CreateTermDto) {
    return this.termsService.create(createTermDto);
  }

  @Get()
  findAll() {
    return this.termsService.findAll();
  }

  @Get(':num')
  findOne(@Param('num') num: number) {
    return this.termsService.findOne(num);
  }

  @Patch(':num')
  update(@Param('num') num: number, @Body() updateTermDto: UpdateTermDto) {
    return this.termsService.update(num, updateTermDto);
  }

  @Delete(':num')
  remove(@Param('num') num: number) {
    return this.termsService.remove(num);
  }
}
