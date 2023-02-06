import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Board } from "../board/board.entity";

@Entity()
@Unique(["nickname"])
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nickname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(type => Board, board => board.user, { eager: true })
  boards: Board[];

}