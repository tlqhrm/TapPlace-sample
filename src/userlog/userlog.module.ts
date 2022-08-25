import { Module } from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { UserlogController } from './userlog.controller';
import { userLogRepository } from 'src/repositories/userlog.repository';
import { UserLogMapper } from './userlog.mapper';
import { DatabaseModule } from 'src/database/database.module';
import { PayListMapper } from 'src/paylist/paylist.mapper';
import { paylistRepository } from 'src/repositories/paylist.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserlogController],
  providers: [
    UserlogService,
    ...userLogRepository,
    UserLogMapper,
    ...paylistRepository,
    PayListMapper,
  ],
})
export class UserlogModule {}
