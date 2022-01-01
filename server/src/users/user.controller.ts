import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/one')
  async One(): Promise<any> {
    const one = await this.userService.One();
    return one;
  }
}
