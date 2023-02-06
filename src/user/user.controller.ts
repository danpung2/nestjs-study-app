import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log('req', req);
  }

}
