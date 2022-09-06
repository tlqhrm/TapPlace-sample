import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { DatabaseModule } from 'src/database/database.module';
import { noticeRepository } from 'src/repositories/notice.repository';
import { NoticeMapper } from './notice.mapper';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [NoticeController],
  providers: [NoticeService, ...noticeRepository, NoticeMapper],
})
export class NoticeModule {}
