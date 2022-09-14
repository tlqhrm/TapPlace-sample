import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  createUser(
    @Body() createUserDto: CreateUserDto,
    @keyCheck(keyPipe) key,
  ): Promise<boolean> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('pays')
  updateUserPapys(
    @Body() updateUserPaysDto: UpdateUserPaysDto,
    @keyCheck(keyPipe) key,
  ) {
    return this.userService.updateUserPays(updateUserPaysDto);
  }

  @Patch('drop')
  dropUser(@Body('user_id') user_id: string, @keyCheck(keyPipe) key) {
    return this.userService.dropUser(user_id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
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
