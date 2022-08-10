import { Module } from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { UserlogController } from './userlog.controller';
import { userLogRepository } from 'src/repositories/userlog.repository';
import { UserLogMapper } from './userlog.mapper';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserlogController],
  providers: [UserlogService, ...userLogRepository, UserLogMapper],
})
export class UserlogModule {}
