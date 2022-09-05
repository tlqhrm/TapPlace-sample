import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userRepository } from 'src/repositories/user.repository';
import { UserMapper } from './user.mapper';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userRepository, UserMapper],
})
export class UserModule {}
