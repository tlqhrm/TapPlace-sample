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

  async getBookmarksById(user_id: string, viewCount, startCount) {
    return await this.bookmarkRepository
      .createQueryBuilder()
      .select('num,store_id')
      .where(`user_id = '${user_id}'`)
      .orderBy('num', 'DESC')
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

  async checkBookmark(user_id, store_id) {
    const result = await this.bookmarkRepository
      .createQueryBuilder()
      .select('count(*) as count')
      .where(`user_id = '${user_id}' and store_id = '${store_id}'`)
      .getRawOne();
    return result;
  }

  async removeBookmark(deleteBookmarkDto: DeleteBookmarkDto) {
    const { user_id, store_id } = deleteBookmarkDto;

    return await this.bookmarkRepository
      .createQueryBuilder()
      .delete()
      .where(`user_id = '${user_id}' and store_id = '${store_id}'`)
      .execute();
  }

  async removeAllBookmark(user_id) {
    return await this.bookmarkRepository
      .createQueryBuilder()
      .delete()
      .where(`user_id = '${user_id}'`)
      .execute();
  }

  async getStoreIds(user_id, stores) {
    let where = '';
    for (let i = 0; i < stores.length; i++) {
      if (i === 0) where += `store_id = '${stores[i]['store_id']}'`;
      else where += ` or store_id = '${stores[i]['store_id']}'`;
    }

    try {
      return await this.bookmarkRepository
        .createQueryBuilder()
        .select('store_id')
        .where(`user_id = '${user_id}' and (${where})`)
        .getRawMany();
    } catch (error) {
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`알 수 없는 오류`, 500);
    }
  }
}
