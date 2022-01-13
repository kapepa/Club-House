import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('room')
@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Receive all rooms' })
  @ApiResponse({
    status: 200,
    description: 'Forbidden.',
    // type: any
  })
  async All(@Req() req): Promise<any> {
    const room = await this.roomService.all();
    return room;
  }

  @Post('/one/:id')
  @UseGuards(JwtAuthGuard)
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
