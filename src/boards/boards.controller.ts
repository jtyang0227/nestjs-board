import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  // spring version
  // boardsService: BoardsService;
  //
  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }

  // nestjs version
  constructor(private boardsService: BoardsService) {
  }

  /**
   * 전체 목록 호출
   */
  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  /**
   * 게시물 생성
   */
  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

}