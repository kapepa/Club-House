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

  async All(): Promise<DtoRoom[]> {
    const rooms = await this.roomRepository.find({
      relations: ['speaker'],
    });
    return rooms;
  }

  async One(props: string, val: string, relation?: string): Promise<DtoRoom> {
    const looking = relation
      ? { where: { [props]: val }, relations: [relation] }
      : { where: { [props]: val } };
    const room = await this.roomRepository.findOne(looking);
    return room;
  }

  async Create(
    id: string,
    room: { title: string; type: string },
  ): Promise<DtoRoom> {
    const user = await this.userService.One('id', id);
    const createRoom = this.roomRepository.create();
    createRoom.title = room.title;
    createRoom.type = room.type;
    createRoom.speaker = [user];
    const roomSave = await this.roomRepository.save(createRoom);
    return roomSave;
  }

  async Update(): Promise<any> {}
}
