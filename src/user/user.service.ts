import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) {}

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

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
      user.password = "";
      return user;
    } else {
      throw new UnauthorizedException("Login Failed");
    }
  }

}
