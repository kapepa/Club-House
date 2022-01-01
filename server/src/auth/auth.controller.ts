import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('github'))
  @Get('/github')
  async GitHub(): Promise<any> {
    return 'github!';
  }
  @UseGuards(AuthGuard('github'))
  @Get('/github/redirect')
  async GitHubRedirect(@Req() req): Promise<any> {
    const user = await this.authService.GithubLogin(req.user);
    return user;
  }
  @UseGuards(AuthGuard('google'))
  @Get('/google')
  async Google(@Req() req): Promise<void> {
    return;
  }
  @UseGuards(AuthGuard('google'))
  @Get('/google/redirect')
  async GoogleRedirect(@Req() req): Promise<any> {
    const user = await this.authService.GoogleLogin(req.user);
    return user;
  }
  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook')
  async Facebook(@Req() req): Promise<void> {
    return;
  }
  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook/redirect')
  async FacebookRedirect(@Req() req): Promise<any> {
    const user = await this.authService.FacebookLogin(req.user);
    return user;
  }
}
