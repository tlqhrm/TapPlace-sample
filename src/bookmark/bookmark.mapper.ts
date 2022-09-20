import { ConflictException, HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmark } from 'src/entities/bookmark.entity';
import { DeleteBookmarkDto } from './dto/delete-bookmark.dto';

export class BookmarkMapper {
  constructor(
    @Inject('BOOKMARK_REPOSITORY')
    private bookmarkRepository: Repository<Bookmark>,
  ) {}
  async createBookmark(createBookmarkDto) {
    const { user_id, store_id } = createBookmarkDto;
    await this.bookmarkRepository
      .createQueryBuilder()
      .insert()
      .values({ user_id, store_id })
      .execute();

    return true;
  }

  async getBookmarksById(user_id: string, page, viewCount, startCount) {
    return await this.bookmarkRepository
      .createQueryBuilder()
      .select('store_id')
      .where(`user_id = '${user_id}'`)
      .limit(viewCount)
      .offset(startCount)
      .getRawMany();
  }

  async getBookmarkCount(user_id) {
    return await this.bookmarkRepository
      .createQueryBuilder()
      .select('count(*) as count')
      .where(`user_id = '${user_id}'`)
      .getRawOne();
  }

  async removeBookmark(deleteBookmarkDto: DeleteBookmarkDto) {
    const { user_id, store_id } = deleteBookmarkDto;

    await this.bookmarkRepository
      .createQueryBuilder()
      .delete()
      .where(`user_id = '${user_id}' and store_id = '${store_id}'`)
      .execute();

    return true;
  }
}