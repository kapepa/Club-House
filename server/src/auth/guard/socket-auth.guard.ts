import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { config } from 'dotenv';
import { WsException } from '@nestjs/websockets';

config();

@Injectable()
export class WsJwtGuard implements CanActivate {
  // constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const cookies: string[] =
        client.handshake.headers.authorization.split(' ');
      const authToken: string = cookies.pop();
      const jwtPayload = jwt.verify(authToken, process.env.JWT_SECRET_WORD);
      if (typeof jwtPayload === undefined) {
        throw new WsException('Missing id_token');
      }
      // context.switchToWs().getData().auth = { id: 'asdas' };
      // context.switchToWs().getData().user = jwtPayload;
      // context.switchToWs().getData().user = jwtPayload;
      return Boolean(true);
    } catch (err) {
      throw new WsException(err.message);
    }
  }

  validateUser(payload): any {
    return payload;
  }
}
