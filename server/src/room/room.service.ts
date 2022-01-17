import { Injectable } from '@nestjs/common';
import { DtoRoom } from '../dto/room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entyty';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private userService: UserService,
  ) {}

  async All(): Promise<any> {
    return [];
  }

  async One(id: string): Promise<any> {
    // const index = list.findIndex((room) => room.id === id);
    return [];
  }

  async Create(
    id: string,
    room: { title: string; type: string },
  ): Promise<any> {
    const user = await this.userService.One('id', id);
    const createRoom = this.roomRepository.create();
    createRoom.title = room.title;
    createRoom.speaker = [user];
    const roomSave = await this.roomRepository.save(createRoom);

    return roomSave.id;
  }

  async Update(): Promise<any> {}
}
