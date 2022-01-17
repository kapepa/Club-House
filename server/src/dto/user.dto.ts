import { ApiProperty } from '@nestjs/swagger';
import { Room } from '../room/room.entyty';

export class UserDto {
  @ApiProperty({ description: 'id user' })
  id: string;
  @ApiProperty({ description: 'email user' })
  email: string;
  @ApiProperty({ description: 'password user' })
  password: string;
  @ApiProperty({ description: 'username user' })
  username: string;
  @ApiProperty({ description: 'fullname user' })
  fullname: string;
  @ApiProperty({ description: 'path avatar user' })
  avatar: string;
  @ApiProperty({ description: 'active user boolean' })
  isActive: boolean;
  @ApiProperty({ description: 'phone user' })
  phone: string;
  @ApiProperty({ description: 'code activate user' })
  code: string;
  @ApiProperty({ description: 'rooms' })
  rooms: Room[];
  @ApiProperty({ description: 'created user' })
  created_at: Date;
  @ApiProperty({ description: 'updated user' })
  updated_at: Date;
}
