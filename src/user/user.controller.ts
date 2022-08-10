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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userService.createUser(createUserDto);
  }

  @Patch('pays')
  updateUserPapys(@Body() updateUserPaysDto: UpdateUserPaysDto) {
    return this.userService.updateUserPays(updateUserPaysDto);
  }
}
