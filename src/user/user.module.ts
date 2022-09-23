import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userRepository } from 'src/repositories/user.repository';
import { UserMapper } from './user.mapper';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [UserController],
  providers: [UserService, ...userRepository, UserMapper],
  exports: [...userRepository, UserMapper],
})
export class UserModule {}
