import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string
  @Column()
  isPublic: boolean
  @ManyToOne(type => User, user => user.boards, { eager: false })
  user: User;
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt: Date
}