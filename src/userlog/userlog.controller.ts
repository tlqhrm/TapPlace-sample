import { Controller, Post, Body } from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { CreateUserlogDto } from './dto/create-userlog.dto';
import { keyCheck } from 'src/keyCheck-decorators';
import { keyPipe } from 'src/keyPipes';

@Controller('userlog')
export class UserlogController {
  constructor(private readonly userlogService: UserlogService) {}

  @Post()
  createUserLog(
    @Body() createUserlogDto: CreateUserlogDto,
    @keyCheck(keyPipe) key,
  ) {
    return this.userlogService.create(createUserlogDto);
  }
}
