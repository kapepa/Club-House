import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';
import { User } from '../users/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ default: 0 })
  @Length(3, 30, {
    message: 'field title room wrong length',
  })
  title: string;

  @Column({ default: 0 })
  @IsNumber()
  message: number;

  @Column({ default: 0 })
  @IsNumber()
  people: number;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  speaker: User[];

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;
}
