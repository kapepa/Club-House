import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { config } from 'dotenv';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.STRATEGY_FACEBOOK_ID,
      clientSecret: process.env.STRATEGY_FACEBOOK_SECRET,
      callbackURL: 'http://localhost:5000/auth/facebook/redirect',
      scope: 'email',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { displayName } = profile;
    const user = {
      email: '',
      firstName: displayName,
      lastName: '',
    };

    done(null, user);
  }
}
