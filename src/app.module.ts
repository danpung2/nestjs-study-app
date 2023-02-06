import { Module } from "@nestjs/common";
import { BoardModule } from "./board/board.module";
import { typeORMConfig } from "./config/typeorm-config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), BoardModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
