import { Body, Controller, Get, Logger, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { Board } from "../board/board.entity";
import { BoardService } from "../board/board.service";

@Controller('user')
export class UserController {
  private logger = new Logger("UserController");
  constructor(
    private userService: UserService,
    private boardService: BoardService
  ) {}

  @Post("/join")
  @UsePipes(ValidationPipe)
  join(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post("/login")
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto): Promise<{accessToken: string}> {
    return this.userService.login(loginDto);
  }

  @Get("/board")
  @UseGuards(AuthGuard())
  getAllBoardByUser(@GetUser() user: User): Promise<Board[]>{
    this.logger.verbose(`User ${user.nickname} trying to get all boards`);

    return this.boardService.getAllBoardByUser(user);
  }

}
