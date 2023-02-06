import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardService } from "./board.service";
// import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../user/get-user.decorator";
import { User } from "../user/user.entity";

@Controller("board")
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}
  /*
  데이터베이스 사용하여 구현
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
    ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoard();
  }

  @Put("/:id")
  @UsePipes(ValidationPipe)
  updateBoard(@Param("id", ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto): Promise<Board> {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete("/:id")
  deleteBoardById(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoardById(id);
  }


  /*
    데이터베이스 없이 구현
     */
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }
  //
  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoard();
  // }
  //
  // @Get("/:id")
  // getBoard(@Param("id") id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }
  //
  // @Put()
  // @UsePipes(ValidationPipe)
  // updateBoardStatus(@Body() updateStatusDto: UpdateBoardDto): Board{
  //   return this.boardService.updateBoardStatus(updateStatusDto);
  // }
  //
  // @Delete("/:id")
  // deleteBoard(@Param("id") id: string): void {
  //   this.boardService.deleteBoard(id);
  // }


}
