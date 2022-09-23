import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { userPipe } from 'src/auth/auth.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { DeleteBookmarkDto } from './dto/delete-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // @ApiOperation({ summary: '유저 즐겨찾기 등록' })
  // @ApiResponse({
  //   status: 201,
  //   description: '성공',
  // })
  // @ApiBody({
  //   type: CreateBookmarkDto,
  //   description: 'asdasd',
  // })
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @GetUser(userPipe) user,
  ) {
    await this.bookmarkService.create(createBookmarkDto);

    throw new HttpException('ok', 200);
  }

  // @ApiTags('bookmark')
  // @ApiOkResponse({
  //   description: `totalCount: number (user의 bookmark 총 개수)<br>
  //   isEnd: number (마지막 페이지 여부)<br>
  //   bookmarks: store(T)[ ] (store(T) 배열)`,
  // })
  // @ApiResponse({
  //   status: 409,
  //   description: '북마크 60개 초과시 등록 x',
  //   schema: { example: new HttpException('북마크 60개 초과', 409) },
  // schema: {
  //   example: {
  //     asdasd: 'asdasd',
  //     asdasdd: 'asdasd',
  //   },
  // },
  // })
  // @ApiOperation({
  //   summary: '유저 즐겨찾기 목록 가져오기',
  //   description: '북마크 60개 초과시 오류발생',
  // })
  // @ApiParam({
  //   name: 'user_id',
  //   example: '123550e8400-e29b-41d4-a716-446655440000',
  //   description: '유저 아이디',
  // })
  // @ApiParam({
  //   name: 'page',
  //   example: '1',
  //   description: 'page당 20개 표시',
  // })
  @Get(':user_id/:page')
  findById(@Param('user_id') user_id: string, @Param('page') page: number) {
    return this.bookmarkService.findById(user_id, page);
  }

  @Delete()
  @UseGuards(AuthGuard())
  async remove(
    @Body() deleteBookmarkDto: DeleteBookmarkDto,
    @GetUser(userPipe) user,
  ) {
    await this.bookmarkService.remove(deleteBookmarkDto);

    throw new HttpException('ok', 200);
  }
}
