import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateMarketingDto } from './dto/update-marketing.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { adminPipe, userPipe } from 'src/auth/auth.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @GetUser(userPipe) user,
  ): Promise<boolean> {
    await this.userService.createUser(createUserDto);
    throw new HttpException('ok', 200);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser(userPipe) user,
  ) {
    await this.userService.updateUser(updateUserDto);

    throw new HttpException('ok', 200);
  }

  @Patch('drop')
  @UseGuards(AuthGuard())
  async dropUser(@Body('user_id') user_id: string, @GetUser(userPipe) user) {
    await this.userService.dropUser(user_id);
    throw new HttpException('ok', 200);
  }

  @Patch('marketing')
  @UseGuards(AuthGuard())
  async updateMarketing(
    @Body() updateMarketingDto: UpdateMarketingDto,
    @GetUser(userPipe) user,
  ) {
    await this.userService.updateMarketing(updateMarketingDto);
    throw new HttpException('ok', 200);
  }

  @Get(':user_id')
  @UseGuards(AuthGuard())
  async getUser(@Param('user_id') user_id: string, @GetUser(userPipe) user) {
    if (process.env.NODE_ENV === 'prod') {
      if (user['role'] === 'admin' || user['user_id'] === user_id)
        return await this.userService.getUser(user_id);
      else throw new HttpException('Unauthorized', 401);
    }
    return await this.userService.getUser(user_id);
  }

  @Get('marketing')
  @UseGuards(AuthGuard())
  async getMarketingUser(@GetUser(adminPipe) admin) {
    return await this.userService.getMarketingUser();
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
