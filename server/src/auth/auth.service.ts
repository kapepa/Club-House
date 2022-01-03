import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
