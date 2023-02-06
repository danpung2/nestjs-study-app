import { Injectable, NotFoundException } from "@nestjs/common";
// import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { v1 as uuid } from "uuid";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { Repository } from "typeorm";

@Injectable()
export class BoardService {
  /*
  데이터베이스 사용하여 구현
   */
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description, isPublic } = createBoardDto;

    const board = new Board();
    board.title = title;
    board.description = description;
    board.isPublic = isPublic;

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise <Board> {
    const board = await this.boardRepository.findOneBy({ id, deletedAt: null });

    if(!board){
      throw new NotFoundException(`[NO DATA] board id: ${id}`);
    }

    return board;
  }

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.findBy({ deletedAt: null });
  }

  async updateBoard(updateBoardDto: UpdateBoardDto): Promise <Board> {
    const board = await this.getBoardById(updateBoardDto.id);

    board.title = updateBoardDto.title;
    board.description = updateBoardDto.description;
    board.isPublic = updateBoardDto.isPublic;

    await this.boardRepository.save(board);

    return board;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.softDelete(id);

    if(!result.affected){
      throw new NotFoundException(`[NO DATA] board id: ${id}`);
    }
  }


  /*
  데이터베이스 없이 구현
   */
  // private boardList: Board[] = [];
  //
  // getAllBoard(): Board[] {
  //   return this.boardList;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description, isPublic } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     isPublic
  //   }
  //
  //   this.boardList.push(board)
  //   return board;
  // }
  //
  // getBoardById(id: string): Board {
  //   const board = this.boardList.find((board) => board.id === id);
  //
  //   if(!board) {
  //     throw new NotFoundException(`[NO DATA] board id: ${id}`);
  //   }
  //
  //   return board;
  // }
  //
  // updateBoardStatus(updateStatusDto: UpdateBoardDto): Board{
  //   const { id, title, description, isPublic } = updateStatusDto;
  //   const board = this.getBoardById(id);
  //   board.title = title;
  //   board.description = description;
  //   board.isPublic = isPublic;
  //
  //   return board;
  // }
  //
  // deleteBoard(id: string): void {
  //   const board = this.getBoardById(id);
  //   this.boardList = this.boardList.filter((board) => board.id !== board.id);
  // }

}
