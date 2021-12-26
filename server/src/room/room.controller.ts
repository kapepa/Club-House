import {Controller, Get, Param, Post} from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/all')
  async All(): Promise<any> {
    const room = await this.roomService.all();
    return room;
  }

  @Post('/one/:id')
  async One(@Param('id') id: string): Promise<any> {
    const room = await this.roomService.one(id);
    return room;
  }
}
