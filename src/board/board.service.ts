import { Injectable } from "@nestjs/common";
import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { v1 as uuid } from "uuid";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
export class BoardService {
  private boardList: Board[] = [];

  getAllBoard(): Board[] {
    return this.boardList;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description, isPublic } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      isPublic
    }

    this.boardList.push(board)
    return board;
  }

  getBoardById(id: string): Board {
    return this.boardList.find((board) => board.id === id)
  }

  updateBoardStatus(updateStatusDto: UpdateStatusDto): Board{
    const { id, title, description, isPublic } = updateStatusDto;
    const board = this.getBoardById(id);
    board.title = title;
    board.description = description;
    board.isPublic = isPublic;

    return board;
  }

  deleteBoard(id: string): void {
    this.boardList = this.boardList.filter((board) => board.id !== id);
  }

}
