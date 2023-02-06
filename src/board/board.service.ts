import { Injectable, NotFoundException } from "@nestjs/common";
// import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { v1 as uuid } from "uuid";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class BoardService {
  /*
  데이터베이스 사용하여 구현
   */
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>) {}

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description, isPublic } = createBoardDto;

    const board = new Board();
    board.title = title;
    board.description = description;
    board.isPublic = isPublic;
    board.user = user;

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise <Board> {
    const board = await this.boardRepository.findOneBy({ id, deletedAt: null, isPublic: true });

    if(!board){
      throw new NotFoundException(`[NO DATA] board id: ${id}`);
    }

    return board;
  }

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.findBy({ deletedAt: null, isPublic: true });
  }

  async getAllBoardByUser(user: User): Promise<Board[]>{
    // Repository API
    // 무한 참조 문제 발생할 것 같음
    // return this.boardRepository.find({ relations: ["user"], where: { user: { id: user.id }, deletedAt: null} })

    // QueryBuilder
    const query = this.boardRepository.createQueryBuilder("board");
    query.where("board.userId = :userId", { userId: user.id })
    const boards = await query.getMany();
    return boards;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise <Board> {
    const board = await this.getBoardById(id);

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
