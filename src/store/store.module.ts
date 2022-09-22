import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreMapper } from './store.mapper';
import { storeRepository } from 'src/repositories/store.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PayModule } from 'src/pay/pay.module';
import { PayMapper } from 'src/pay/pay.mapper';
import { payRepository } from 'src/repositories/pay.repository';
import { BookmarkMapper } from 'src/bookmark/bookmark.mapper';
import { bookmarkRepository } from 'src/repositories/bookmark.repository';

@Module({
  imports: [DatabaseModule, PayModule],
  controllers: [StoreController],
  providers: [
    StoreService,
    StoreMapper,
    ...storeRepository,
    ...payRepository,
    BookmarkMapper,
    ...bookmarkRepository,
  ],
  exports: [StoreMapper, ...storeRepository],
})
export class StoreModule {}
