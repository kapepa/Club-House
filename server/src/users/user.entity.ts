import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsEmail,
  IsBoolean,
  IsDate,
  IsPhoneNumber,
  Length,
  IsString,
  MinLength,
} from 'class-validator';
import { Room } from '../room/room.entyty';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ default: '' })
  @IsEmail({
    message: 'email is not proper',
  })
  email: string;

  @Column({ default: '' })
  @IsString({
    message: 'password is not proper',
  })
  @MinLength(6, {
    message: 'short password',
  })
  password: string;

  @Column()
  @Length(3, 30, {
    message: 'username minimu three character, max thirty',
  })
  username: string;

  @Column({ default: '' })
  @Length(3, 30, {
    message: 'fullname minimu three character, max thirty',
  })
  fullname: string;

  @Column({ default: '' })
  @IsString()
  avatar: string;

  @Column({ default: false })
  @IsBoolean()
  isActive: boolean;

  @Column({ default: '' })
  @IsPhoneNumber('IN', {
    message: 'phone number is not valid',
  })
  phone: string;

  @Column({ default: '' })
  @Length(4, 4, {
    message: 'incorrect confirmation code set ',
  })
  code: string;

  @ManyToMany(() => Room, (room) => room.speaker)
  rooms: Room[];

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
