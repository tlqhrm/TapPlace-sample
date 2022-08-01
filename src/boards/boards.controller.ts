import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { type } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { ExceptionHandler } from 'src/ExceptHandler';
import { BoardStatus } from './board-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseFilters(new ExceptionHandler())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.boardService.getAllBoards();
  }

  @Post('/')
  // @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    console.log(CreateBoardDto);
    console.log(typeof CreateBoardDto.title);
    return this.boardService.createBoard(CreateBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    console.log(id);
    console.log(typeof id);
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoards();
  // }
  // @Post('/')
  // @UsePipes(ValidationPipe)
  // creatBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(CreateBoardDto);
  // }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoard(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
