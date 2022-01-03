import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('github'))
  @Get('/github')
  async GitHub(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('github'))
  @Get('/github/redirect')
  async GitHubRedirect(
    @Req() req: { Request; user: any },
    @Res() res: Response,
  ): Promise<void> {
    try {
      // const user = await this.authService.GithubLogin({
      //   email: '',
      //   username: req.user.username,
      //   fullname: req.user.displayName,
      //   avatar: req.user._raw.avatar_url,
      //   isActive: false,
      //   phone: '',
      // });
      res.send(
        JSON.stringify(
          `<script>window.opener.postMessage('test postMessage', '*'); window.close();</script>`,
        ),
      );
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google')
  async Google(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google/redirect')
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
      });
      res.send(
        JSON.stringify(
          `<script>window.opener.postMessage('test postMessage', '*'); window.close();</script>`,
        ),
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
  async FacebookRedirect(@Req() req: Request): Promise<any> {
    try {
      // const user = await this.authService.FacebookLogin(req.user);
      return {
        statusCode: HttpStatus.OK,
        data: req.user,
      };
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.FORBIDDEN);
    }
  }
}
