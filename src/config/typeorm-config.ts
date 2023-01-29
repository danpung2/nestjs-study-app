import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tester',
  password: 'qwerty1234',
  database: 'nestjs-study',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true
}