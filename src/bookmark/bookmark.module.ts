import { forwardRef, Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BookmarkMapper } from './bookmark.mapper';
import { bookmarkRepository } from 'src/repositories/bookmark.repository';
import { StoreModule } from 'src/store/store.module';
import { UserMapper } from 'src/user/user.mapper';
import { userRepository } from 'src/repositories/user.repository';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => StoreModule),
    UserModule,
    AdminModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkMapper, ...bookmarkRepository],
  exports: [BookmarkMapper, ...bookmarkRepository],
})
export class BookmarkModule {}
