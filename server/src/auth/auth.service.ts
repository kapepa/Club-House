import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  async GoogleLogin(user: UserDto): Promise<UserDto> {
    console.log(user);
    return user;
  }
  async GithubLogin(user: UserDto): Promise<UserDto> {
    console.log(user);
    return user;
  }
  async FacebookLogin(user: UserDto): Promise<UserDto> {
    console.log(user);
    return user;
  }
}
