import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../config/jwt.strategy";
import { BoardService } from "../board/board.service";
import { Board } from "../board/board.entity";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: "SeCrEt123456",
      signOptions: {
        // 3600, 1시간
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmModule.forFeature([User, Board])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, BoardService],
  exports: [JwtStrategy, PassportModule]
})
export class UserModule {}
