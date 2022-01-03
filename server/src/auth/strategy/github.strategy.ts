import { Strategy, VerifyCallback } from 'passport-github';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.STRATEGY_GITHUB_ID,
      clientSecret: process.env.STRATEGY_GITHUB_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/redirect',
    });
  }

  async validate(
    id: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
