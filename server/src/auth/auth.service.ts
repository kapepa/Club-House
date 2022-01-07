import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../users/user.service';
import { FileService } from '../file/file.service';
import { JwtService } from '@nestjs/jwt';
import * as SMS from 'sms_ru';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly jwtService: JwtService,
  ) {}

  async Confirmed(user: {
    id: string;
    code: string;
  }): Promise<{ access_token: string }> {
    const profile = await this.userService.One('id', user.id);
    if (profile.code !== user.code)
      throw new HttpException(`This code don't correct`, HttpStatus.FORBIDDEN);
    const complete = await this.userService.Update('id', {
      ...profile,
      isActive: true,
    });
    const token = await this.CreatToken(profile);
    return token;
  }

  async CreatToken(user: UserDto): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async Login(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  RandomCode(): string {
    const code = Math.random() * 1000000;
    return code.toString().substring(0, 4);
  }

  async SMSActivate(code: string, phone: string): Promise<void> {
    const sms = new SMS(process.env.SMS_KEY_SECRET);
    const onlyNumber = phone.replace(
      /^[+]([0-9]{2})[-\s\.][(]{0,1}([0-9]{3})[)]{0,1}[-\s\.]{0,1}([0-9]{3})[-\s\.]{0,1}([0-9]{2})[-\s\.]{0,1}([0-9]{2})$/,
      (str, $1, $2, $3, $4, $5) => {
        return `${$1}${$2}${$3}${$4}${$5}`;
      },
    );

    await sms.sms_send(
      {
        to: onlyNumber,
        text: code,
      },
      function (e) {
        console.log(e.description);
      },
    );
  }

  async Registration(user: UserDto): Promise<UserDto> {
    const code: string = this.RandomCode();

    const pathUrl =
      typeof user.avatar === 'string'
        ? user.avatar
        : await this.fileService.LoadFile(user.avatar);

    const profile = user.hasOwnProperty('id')
      ? await this.userService.Update('id', { ...user, avatar: pathUrl, code })
      : await this.userService.Create({ ...user, avatar: pathUrl, code });
    // await this.SMSActivate(code, user.phone);
    return profile;
  }

  async GoogleLogin(user: UserDto): Promise<UserDto> {
    const profile = await this.userService.Create(user);
    return profile;
  }

  async GithubLogin(user: UserDto): Promise<UserDto> {
    const profile = await this.userService.Create(user);
    return profile;
  }

  async FacebookLogin(user: UserDto): Promise<UserDto> {
    console.log(user);
    return user;
  }
}
