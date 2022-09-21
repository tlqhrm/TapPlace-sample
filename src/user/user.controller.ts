import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPaysDto } from './dto/updatePay-user.dto';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    await this.userService.createUser(createUserDto);

    throw new HttpException('ok', 200);
  }

  @Patch('drop')
  async dropUser(@Body('user_id') user_id: string, @keyCheck(keyPipe) key) {
    await this.userService.dropUser(user_id);
    throw new HttpException('ok', 200);
  }

  @Patch(':user_id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('user_id') user_id: string,
    @keyCheck(keyPipe) key,
  ) {
    await this.userService.updateUser(updateUserDto, user_id);

    throw new HttpException('ok', 200);
  }

  // @Get(':id')
  // getUser(@Param('id') id: string) {
  //   return this.userService.getUser(id);
  // }
  //개발시에만 쓰는 REST API
  // @Get()
  // getAllUser() {
  //   return this.userService.getAllUser();
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string, @keyCheck(keyPipe) key) {
  //   return this.userService.deleteUser(id);
  // }
}
