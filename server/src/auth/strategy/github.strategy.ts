import { Strategy } from 'passport-github';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '67b2ca3ebfc0d954e83d',
      clientSecret: '0776a8e612ae8594f79867ab9b471eb96a3f3fd6',
      // callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    });
  }

  async validate(email, password, done: any) {
    console.log(email);
    // await this.authService
    //   .logIn(email, password)
    //   .then((user) => done(null, user))
    //   .catch((err) => done(err, false));
  }
}

export const callback = (err, user, info) => {
  if (typeof info != 'undefined') {
    throw new UnauthorizedException(info.message);
  } else if (err || !user) {
    throw err || new UnauthorizedException();
  }
  return user;
};
