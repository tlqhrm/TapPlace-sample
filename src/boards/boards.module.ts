import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { boardRepository } from './boards.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [...boardRepository, BoardsService],
})
export class BoardsModule {}
