import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BookmarkMapper } from './bookmark.mapper';
import { bookmarkRepository } from 'src/repositories/bookmark.repository';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkMapper, ...bookmarkRepository],
})
export class BookmarkModule {}
