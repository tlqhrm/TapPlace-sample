import { Injectable, HttpException } from '@nestjs/common';
import { StoreMapper } from 'src/store/store.mapper';
import { BookmarkMapper } from './bookmark.mapper';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { DeleteBookmarkDto } from './dto/delete-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    private bookmarkMapper: BookmarkMapper,
    private storeMapper: StoreMapper,
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    const { user_id } = createBookmarkDto;
    const bookmarkLimit = 60;
    const count = await this.bookmarkMapper.getBookmarkCount(user_id);
    if (count['count'] > bookmarkLimit)
      throw new HttpException(`북마크 ${bookmarkLimit}개를 초과.`, 409);

    return this.bookmarkMapper.createBookmark(createBookmarkDto);
  }

  async findById(user_id: string, page) {
    const viewCount = 2;
    const startCount = (page - 1) * viewCount;
    const result = {
      total_count: 0,
      isEnd: false,
      bookmarks: [],
    };
    const totalCount = await this.bookmarkMapper.getBookmarkCount(user_id);
    result['total_count'] = totalCount['count'];
    const stores = await this.bookmarkMapper.getBookmarksById(
      user_id,
      viewCount,
      startCount,
    );
    if (totalCount['count'] - viewCount * page <= 0) result['isEnd'] = true;
    if (!stores.length) return result;
    const store_ids = [];
    for (const store of stores) {
      store_ids.push(store['store_id']);
    }
    result['bookmarks'] = await this.storeMapper.getStoreById2(store_ids);

    return result;
  }

  async remove(deleteBookmarkDto: DeleteBookmarkDto) {
    const result = await this.bookmarkMapper.removeBookmark(deleteBookmarkDto);
    console.log(result);
    if (!result['affected']) throw new HttpException('해당 북마크 없음', 409);
    return result;
  }
}
