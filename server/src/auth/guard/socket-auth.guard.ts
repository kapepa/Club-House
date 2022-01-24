import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { WsException } from '@nestjs/websockets';

config();

@Injectable()
export class WsJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const cookies = client.handshake.headers.authorization.split(' ');
      const authToken = cookies.pop();
      const jwtPayload = jwt.verify(authToken, process.env.JWT_SECRET_WORD);

      context.switchToHttp().getRequest().user = jwtPayload;
      return Boolean(true);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
