import { Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/one/:id')
  @ApiResponse({
    status: 200,
    description: 'Receive one user',
    type: UserDto,
  })
  async One(@Param() id: string): Promise<any> {
    const one = await this.userService.One();
    return one;
  }
}
