import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsBoolean,
  IsDate,
  IsPhoneNumber,
  Length,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id user' })
  id: string;

  @Column({ default: '' })
  @IsEmail({
    message: 'email is not proper',
  })
  @ApiProperty({ description: 'email user' })
  email: string;

  @Column()
  @Length(3, 30, {
    message: 'username minimu three character, max thirty',
  })
  @ApiProperty({ description: 'username user' })
  username: string;

  @Column({ default: '' })
  @Length(3, 30, {
    message: 'fullname minimu three character, max thirty',
  })
  @ApiProperty({ description: 'fullname user' })
  fullname: string;

  @Column({ default: '' })
  @IsString()
  @ApiProperty({ description: 'path avatar user' })
  avatar: string;

  @Column({ default: false })
  @IsBoolean()
  @ApiProperty({ description: 'active user boolean' })
  isActive: boolean;

  @Column({ default: '' })
  @IsPhoneNumber('IN', {
    message: 'phone number is not valid',
  })
  @ApiProperty({ description: 'phone user' })
  phone: string;

  @Column({ default: '' })
  @Length(4, 4, {
    message: 'incorrect confirmation code set ',
  })
  @ApiProperty({ description: 'code activate user' })
  code: string;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'created user' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'updated user' })
  updated_at: Date;
}
