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
      profileFields: ['email', 'public_profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    // const { name, emails } = profile;
    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    // };
    // const payload = {
    //   user,
    //   accessToken,
    // };
    // console.log(profile);
    done(null, profile);
  }
}
