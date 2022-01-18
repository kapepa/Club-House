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

  @Column({ default: '', select: false })
  @IsEmail({
    message: 'email is not proper',
  })
  email: string;

  @Column({ default: '', select: false })
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

  @Column({ default: false, select: false })
  @IsBoolean()
  isActive: boolean;

  @Column({ default: '', select: false })
  @IsPhoneNumber('IN', {
    message: 'phone number is not valid',
  })
  phone: string;

  @Column({ default: '', select: false })
  @Length(4, 4, {
    message: 'incorrect confirmation code set ',
  })
  code: string;

  @ManyToMany(() => Room, (room) => room.speaker)
  rooms: Room[];

  @CreateDateColumn({ select: false })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  @IsDate()
  updated_at: Date;
}
