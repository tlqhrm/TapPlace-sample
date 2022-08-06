import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreMapper } from './store.mapper';
import { storeRepository } from 'src/repositories/store.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, StoreMapper, ...storeRepository],
})
export class StoreModule {}
