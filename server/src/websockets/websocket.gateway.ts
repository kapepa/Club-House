import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
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
  // @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Append new user in hall',
  })
  async Hall(@MessageBody() data: any): Promise<any> {
    console.log(data);
    return 4;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
