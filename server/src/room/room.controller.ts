import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DtoRoom } from '../dto/room.dto';

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
    description: 'Get all room',
    type: DtoRoom,
  })
  async All(@Req() req): Promise<DtoRoom[]> {
    const room = await this.roomService.All();
    return room;
  }

  @Post('/one/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Receive one room on id' })
  @ApiResponse({
    status: 200,
    description: 'Get one room',
    type: DtoRoom,
  })
  async One(@Param('id') id: string): Promise<DtoRoom> {
    const room = await this.roomService.One(id);
    return room;
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Create new room',
    type: DtoRoom,
  })
  async Create(
    @Req() req,
    @Body() body: { title: string; type: string },
  ): Promise<string> {
    const room = await this.roomService.Create(req.user.userId, body);
    return 'sas';
  }
}
