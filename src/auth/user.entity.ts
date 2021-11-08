import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
// @Unique(['username']) // 유니크값 처리
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Board, board => board.user, { eager: true })
  boards: Board[];
}