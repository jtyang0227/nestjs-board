import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
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
   * 전체 게시물 가져오기
   */
  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  /**
   * 게시물 생성
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  /**
   * 단일 게시물 가져오기
   * @param id
   */
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  /**
   * 게시물 삭제
   * @param id
   */
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  /**
   *
   * @param id
   * @param status
   */
  @Patch('/:id/status')
  updateBoardStatus(@Param('id') id: string,
                    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }

  /**
   * 파이브(ParseIntPipe)
   * @param id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return;
  }


}