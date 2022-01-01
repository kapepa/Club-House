import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async GoogleLogin(user: any): Promise<any> {
    console.log(user);
    return 'sdas';
  }
  async GithubLogin(user: any): Promise<any> {
    console.log(user);
    return 'sdas';
  }
  async FacebookLogin(user: any): Promise<any> {
    console.log(user);
    return 'FacebookLogin';
  }
}
