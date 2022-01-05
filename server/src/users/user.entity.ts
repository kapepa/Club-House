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

  @Column()
  @IsEmail()
  @ApiProperty({ description: 'email user' })
  email: string;

  @Column()
  @Length(3, 30)
  @ApiProperty({ description: 'username user' })
  username: string;

  @Column()
  @Length(3, 30)
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

  @Column()
  @IsPhoneNumber()
  @ApiProperty({ description: 'phone user' })
  phone: string;

  @Column()
  @Length(4, 4)
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
