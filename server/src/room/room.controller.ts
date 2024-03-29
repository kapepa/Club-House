import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
@Controller('/api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
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
    const room = await this.roomService.One('id', id, 'speaker');
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
    return room.id;
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete room',
  })
  async Delete(@Req() req, @Param('id') id: string): Promise<boolean> {
    const del = await this.roomService.Delete(req.user.userId, id);
    return del;
  }
}
