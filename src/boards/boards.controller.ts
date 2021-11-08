import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
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
  getAllBoard(
    @GetUser() user: User,
  ): Promise<Board[]> {
    this.logger.verbose(`User : ${user.username} trying to get all boards`);

    return this.boardsService.getAllBoards(user);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    const createBoard = JSON.stringify(createBoardDto);
    this.logger.verbose(`User ${user.username} creating a new board. Payload: ${createBoard}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
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