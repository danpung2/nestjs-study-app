import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BoardService } from "./board.service";
import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("board")
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoard();
  }

  @Get("/:id")
  getBoard(@Param("id") id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Put()
  updateBoardStatus(@Body() updateStatusDto: UpdateStatusDto): Board{
    return this.boardService.updateBoardStatus(updateStatusDto);
  }

  @Delete("/:id")
  deleteBoard(@Param("id") id: string): void {
    this.boardService.deleteBoard(id);
  }
}
