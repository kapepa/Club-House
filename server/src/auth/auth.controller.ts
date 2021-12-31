import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GithubStrategy } from './strategy/github.strategy';

@Controller('auth')
export class AuthController {
  @UseGuards(GithubStrategy)
  @Get('/github')
  async GitHub(): Promise<any> {
    return 'github!';
  }
}
