import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../users/user.service';
import { FileService } from '../file/file.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as SMS from 'sms_ru';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

interface IRegistration {
  id?: string | undefined;
  message: string;
  error: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

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

  async BcryptHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(
      password,
      Number(process.env.CRYPTO_WORD_SECRET),
    );
    return hash;
  }

  async ExistEmail(user: UserDto): Promise<IRegistration> {
    const exist = await this.userService.One('email', user.email);
    if (exist && exist.code.length)
      return {
        id: undefined,
        message: 'Such email already exist!',
        error: true,
      };
    return {
      id: undefined,
      message: 'Such email not exist!',
      error: false,
    };
  }

  async ExistPhone(user: UserDto): Promise<IRegistration> {
    const exist = await this.userService.One('phone', user.phone);
    if (exist && exist.code.length)
      return {
        id: undefined,
        message: 'Such phone already exist!',
        error: true,
      };
    return {
      id: undefined,
      message: 'Such phone not exist!',
      error: false,
    };
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
        throw e;
      },
    );
  }

  async ConfirmedCode(user: {
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

  async EmailActivate(
    code: string,
    email: string,
    username: string,
  ): Promise<void> {
    this.mailerService
      .sendMail({
        to: email,
        from: process.env.MAILDEV_INCOMING_USER,
        subject: 'Registration from Clubhouse✔',
        text: 'Welcome to Clubhouse',
        html: `<b>Hellow ${username}, you success registration in Clubhouse! Your code for completion registration is ${code}</b>`,
      })
      .catch((err) => {
        throw new HttpException(
          'An error occured during registration',
          HttpStatus.FORBIDDEN,
        );
      });
  }

  async Registration(user: UserDto): Promise<IRegistration> {
    const code: string = this.RandomCode();

    if (user.email?.length) {
      const existEmail = await this.ExistEmail(user);
      if (existEmail.error) return existEmail;
      await this.EmailActivate(code, user.email, user.username);
    } else if (user.phone?.length) {
      const existPhone = await this.ExistPhone(user);
      if (existPhone.error) return existPhone;
      // await this.SMSActivate(code, user.phone);
    }

    if (user.password.length)
      user.password = await this.BcryptHash(user.password);

    const pathUrl =
      typeof user.avatar === 'string'
        ? user.avatar
        : await this.fileService.LoadFile(user.avatar);

    const profile = user.hasOwnProperty('id')
      ? await this.userService.Update('id', { ...user, avatar: pathUrl, code })
      : await this.userService.Create({ ...user, avatar: pathUrl, code });

    return { id: profile.id, message: 'success', error: false };
    return { id: 'asdasdas', message: 'success', error: false };
  }

  async GoogleLogin(user: UserDto): Promise<UserDto | IRegistration> {
    if (user.email.length) {
      const existEmail = await this.ExistEmail(user);
      if (existEmail.error) return existEmail;
    }
    const profile = await this.userService.Create(user);
    return profile;
  }

  async GithubLogin(user: UserDto): Promise<UserDto | IRegistration> {
    if (user.email.length) {
      const existEmail = await this.ExistEmail(user);
      if (existEmail.error) return existEmail;
    }
    const profile = await this.userService.Create(user);
    return profile;
  }

  async FacebookLogin(user: UserDto): Promise<UserDto | IRegistration> {
    if (user.email.length) {
      const existEmail = await this.ExistEmail(user);
      if (existEmail.error) return existEmail;
    }
    console.log(user);
    return user;
  }
}
