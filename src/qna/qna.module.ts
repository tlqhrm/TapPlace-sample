import { Module } from '@nestjs/common';
import { QnaService } from './qna.service';
import { QnaController } from './qna.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from 'src/admin/admin.module';
import { qnaRepository } from 'src/repositories/qna.repository';
import { QnaMapper } from './qna.mapper';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AdminModule, UserModule],
  controllers: [QnaController],
  providers: [QnaService, ...qnaRepository, QnaMapper],
})
export class QnaModule {}
