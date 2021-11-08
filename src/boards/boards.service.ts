import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from '../auth/user.entity';

// import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(BoardRepository) private boardRepository: BoardRepository) {
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }

  //
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id : ${id}`);
  //   }
  //
  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  /**
   * 전체 목록 가져오기
   */
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    // 자신의 게시물만 가져오기
    query.where('board.userId = :userId', { userId: user.id });
    const board = await query.getMany();

    return board;
  }

  /**
   * 생성
   * @param createBoardDto
   */
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  /**
   * 찾기
   * @param id
   */
  async getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  /**
   * 수정
   * @param id
   * @param status
   */
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }

  /**
   * 삭제
   * @param id
   * @param user
   */
  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    // 예외처리
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }
  }
}
