import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { BoardService } from "./board.service";
import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @UsePipes(ValidationPipe)
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
  @UsePipes(ValidationPipe)
  updateBoardStatus(@Body() updateStatusDto: UpdateBoardDto): Board{
    return this.boardService.updateBoardStatus(updateStatusDto);
  }

  @Delete("/:id")
  deleteBoard(@Param("id") id: string): void {
    this.boardService.deleteBoard(id);
  }
}
