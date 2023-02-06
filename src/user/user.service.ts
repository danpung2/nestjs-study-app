import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createUser(creatUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nickname = creatUserDto.nickname;
    user.email = creatUserDto.email;
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    user.password = await bcrypt.hash(creatUserDto.password, salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if(error.code === "23505"){
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }

    user.password = "";
    return user;
  }

  async login(loginDto: LoginDto): Promise<{accessToken: string}> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException("Login Failed");
    }
  }

}
