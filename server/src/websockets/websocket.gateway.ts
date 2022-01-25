import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Req, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guard/socket-auth.guard';
import { UserDto } from '../dto/user.dto';

class IOSocket extends Socket {
  user: UserDto;
}

@ApiBearerAuth()
@UseGuards(WsJwtGuard)
@ApiTags('socket')
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  private roomMap = new Map<string, Map<string, UserDto>>();

  @SubscribeMessage('hall')
  @ApiResponse({
    status: 200,
    description: 'Append new user in hall',
  })
  async Hall(
    @MessageBody() body: any,
    @Req() io,
  ): Promise<{ community: any; updateRooms: boolean }> {
    io.join('hall');
    return { community: this.PeopleCountRooms(), updateRooms: false };
  }

  @SubscribeMessage('leaveHall')
  @ApiResponse({
    status: 200,
    description: 'leave from hall',
  })
  async LeaveHall(@Req() io): Promise<void> {
    io.leave('hall');
  }

  @SubscribeMessage('joinRoom')
  @ApiResponse({
    status: 200,
    description: 'Append new user to room',
  })
  async JoinRoom(@MessageBody() body: any, @Req() io): Promise<UserDto[]> {
    const { room } = body;
    const existRoom = !this.roomMap.has(room);

    if (existRoom) this.roomMap.set(room, new Map());
    this.roomMap.set(room, this.roomMap.get(room).set(io.id, io.user));
    const users = Array.from(this.roomMap.get(room).values());
    io.broadcast.in(room).emit('listenUser', users);
    io.join(room);
    this.ChangeCountRooms(io, existRoom);

    return users;
  }

  @SubscribeMessage('leaveRoom')
  @ApiResponse({
    status: 200,
    description: 'Remove user from room',
  })
  async LeaveRoom(@MessageBody() body: any, @Req() io): Promise<void> {
    const { room } = body;
    this.ClearRoom(room, io);
    this.ChangeCountRooms(io);
  }

  @SubscribeMessage('deleteRoom')
  @ApiResponse({
    status: 200,
    description: 'Delete room',
  })
  async DeleteRoom(@MessageBody() body: any, @Req() io): Promise<void> {
    const { room } = body;
    this.roomMap.delete(room);
    io.leave(room);
    if (io.adapter.rooms.has(room)) io.adapter.rooms.delete(room);
    this.ChangeCountRooms(io, true);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove user which disconnect',
  })
  handleDisconnect(@Req() io) {
    let key;
    for (key of this.roomMap.keys()) {
      if (this.roomMap.has(key) && this.roomMap.get(key).has(io.id)) {
        this.ClearRoom(key, io);
        break;
      }
    }
    this.ChangeCountRooms(io);
    io.leave('hall');
  }

  ClearRoom(room: string, io: IOSocket) {
    if (!this.roomMap.has(room)) return;

    if (this.roomMap.get(room).size <= 1) {
      this.roomMap.delete(room);
    } else {
      this.roomMap.get(room).delete(io.id);
    }

    io.leave(room);
    if (this.roomMap.get(room)) {
      const users = Array.from(this.roomMap.get(room).values());
      io.broadcast.in(room).emit('listenUser', users);
    }
  }

  ChangeCountRooms(io: Socket, update = false) {
    const peopleRoom = this.PeopleCountRooms();
    if (Object.keys(peopleRoom)) {
      io.broadcast.in('hall').emit('peopleCountRooms', {
        community: peopleRoom,
        updateRooms: update,
      });
    }
  }

  PeopleCountRooms() {
    let key;
    const roomSize = {};
    for (key of this.roomMap.keys()) {
      if (this.roomMap.get(key).size) {
        roomSize[key] = { people: this.roomMap.get(key).size };
      }
    }
    return roomSize;
  }
}
