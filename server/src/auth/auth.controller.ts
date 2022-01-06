import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @ApiResponse({
    status: 200,
    description: 'Registaration new user',
  })
  async Registration(@Body() body): Promise<string> {
    console.log(body);
    return 'fds';
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  @ApiResponse({
    status: 200,
    description: 'Open github for auth',
  })
  async GitHub(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  @ApiResponse({
    status: 200,
    description: 'Receive data from gitnub and save',
    type: User,
  })
  async GitHubRedirect(
    @Req() req: { Request; user: any },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.GithubLogin({
        email: '',
        username: req.user.username,
        fullname: req.user.displayName,
        avatar: req.user.photos[0].value,
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: 200,
    description: 'Open google for auth',
  })
  async Google(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google/redirect')
  @ApiResponse({
    status: 200,
    description: 'Receive data from google and save',
    type: User,
  })
  async GoogleRedirect(
    @Req() req: { Request; user: any },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.GoogleLogin({
        email: req.user.email,
        username: req.user.firstName,
        fullname: req.user.lastName,
        avatar: req.user.picture,
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook')
  async Facebook(@Req() req): Promise<any> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook/redirect')
  async FacebookRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.authService.FacebookLogin({
        email: '',
        username: '',
        fullname: '',
        avatar: '',
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }
}
