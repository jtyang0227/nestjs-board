import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  // PK
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // @ManyToOne(type => User, user => user.boards, { eager: false })
  // user: User;
}