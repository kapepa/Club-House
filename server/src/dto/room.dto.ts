import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

export class DtoRoom {
  @ApiProperty({ description: 'id room' })
  id: string;
  @ApiProperty({ description: 'Name room' })
  title: string;
  @ApiProperty({ description: 'type room' })
  type: string;
  @ApiProperty({ description: 'total count message in room' })
  message: number;
  @ApiProperty({ description: 'total user in room' })
  people: number;
  @ApiProperty({ description: 'Speaker in room' })
  speaker?: User[];
  @ApiProperty({ description: 'created user' })
  createdAt?: Date;
  @ApiProperty({ description: 'updated user' })
  updateAt?: Date;
}
