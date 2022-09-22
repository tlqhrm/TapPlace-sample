import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';

@Controller('userlog')
export class UserlogController {
  constructor(private readonly userlogService: UserlogService) {}

  @HttpCode(200)
  @Post()
  async createUserLog(
    @Body() createUserlogDto: CreateUserlogDto,
    @keyCheck(keyPipe) key,
  ) {
    return await this.userlogService.createUserLog(createUserlogDto);
  }

  //개발시에만 쓰는 REST API
  // @Get()
  // getAllUser() {
  //   return this.userlogService.getAllUserLog();
  // }

  // @Get(':id')
  // getUser(@Param('id') id: string) {
  //   return this.userlogService.getUserLog(id);
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string, @keyCheck(keyPipe) key) {
  //   return this.userlogService.deleteUserLog(id);
  // }
}
