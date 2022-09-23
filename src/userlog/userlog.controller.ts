import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { userPipe } from 'src/auth/auth.pipe';

@Controller('userlog')
export class UserlogController {
  constructor(private readonly userlogService: UserlogService) {}

  @HttpCode(200)
  @Post()
  @UseGuards(AuthGuard())
  async createUserLog(
    @Body() createUserlogDto: CreateUserlogDto,
    @GetUser(userPipe) user,
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
