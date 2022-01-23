import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsJwtGuard } from '../auth/guard/socket-auth.guard';

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

  @SubscribeMessage('hall')
  @ApiResponse({
    status: 200,
    description: 'Append new user in hall',
  })
  async Hall(client: Socket, payload: any): Promise<any> {
    console.log(client, payload);
    return 4;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
