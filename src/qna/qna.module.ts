import { Module } from '@nestjs/common';
import { QnaService } from './qna.service';
import { QnaController } from './qna.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from 'src/admin/admin.module';
import { qnaRepository } from 'src/repositories/qna.repository';
import { QnaMapper } from './qna.mapper';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [QnaController],
  providers: [QnaService, ...qnaRepository, QnaMapper],
})
export class QnaModule {}
