import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  // spring version
  // boardsService: BoardsService;
  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }

  // nestjs version
  constructor(private boardsService: BoardsService) {
  }

  // /**
  //  * 전체 게시물 가져오기
  //  */
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  //
  // /**
  //  * 게시물 생성
  //  */
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  //
  // /**
  //  * 단일 게시물 가져오기
  //  * @param id
  //  */
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void>{
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(@Param('id', ParseIntPipe) id: number,
                    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  //
  // /**
  //  * 게시물 삭제
  //  * @param id
  //  */
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // /**
  //  *
  //  * @param id
  //  * @param status
  //  */
  // @Patch('/:id/status')
  // updateBoardStatus(@Param('id') id: string,
  //                   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
  //
  // /**
  //  * 파이브(ParseIntPipe)
  //  * @param id
  //  */
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return;
  // }


}