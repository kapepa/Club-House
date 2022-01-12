import { Controller, Param, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('room')
@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/all')
  @ApiOperation({ summary: 'Receive all rooms' })
  @ApiResponse({
    status: 200,
    description: 'Forbidden.',
    // type: any
  })
  async All(@Req() req): Promise<any> {
    console.log(req.headers);
    const room = await this.roomService.all();
    return room;
  }

  @Post('/one/:id')
  @ApiOperation({ summary: 'Receive one room on id' })
  @ApiResponse({
    status: 200,
    description: 'Forbidden.',
    // type: any
  })
  async One(@Param('id') id: string): Promise<any> {
    const room = await this.roomService.one(id);
    return room;
  }
}
