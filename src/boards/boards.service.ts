import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
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
  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  /**
   * 생성
   * @param createBoardDto
   */
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  /**
   * 찾기
   * @param id
   */
  getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.getBoardById(id);

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
   */
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    // 예외처리
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }
  }
}
