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
import { TermsService } from './terms.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { adminPipe } from 'src/auth/auth.pipe';

@Controller('terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTermDto: CreateTermDto, @GetUser(adminPipe) admin) {
    return this.termsService.create(createTermDto);
  }

  @Get()
  findAll() {
    return this.termsService.findLast();
  }

  @Get(':num')
  @UseGuards(AuthGuard())
  findOne(@Param('num') num: number, @GetUser(adminPipe) admin) {
    return this.termsService.findOne(num);
  }

  @Patch(':num')
  @UseGuards(AuthGuard())
  update(
    @Param('num') num: number,
    @Body() updateTermDto: UpdateTermDto,
    @GetUser(adminPipe) admin,
  ) {
    return this.termsService.update(num, updateTermDto);
  }

  @Delete(':num')
  @UseGuards(AuthGuard())
  remove(@Param('num') num: number, @GetUser(adminPipe) admin) {
    return this.termsService.remove(num);
  }
}
