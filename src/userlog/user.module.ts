import { Module } from '@nestjs/common';
import { LogService } from './userlog.service';
import { LogController } from './user.controller';

@Module({
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
