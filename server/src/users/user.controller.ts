import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/one/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Receive one user',
    type: UserDto,
  })
  async One(@Param() id: string): Promise<any> {
    try {
      // const one = await this.userService.One();
      return 'one user';
    } catch (e) {
      throw new HttpException('One', HttpStatus.FORBIDDEN);
    }
  }

  @Post('/own')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Getting your own user data ',
    type: UserDto,
  })
  async Own(@Req() req): Promise<any> {
    try {
      const user = await this.userService.Select(req.user.userId);
      return user;
    } catch (e) {
      throw new HttpException('Own', HttpStatus.FORBIDDEN);
    }
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Getting your own user data ',
    type: UserDto,
  })
  async Update(@Req() req, @Body() body): Promise<boolean> {
    try {
      const update = await this.userService.Update(body.filed, {
        id: req.user.userId,
        [body.filed]: body.value,
      });
      return update ? true : false;
    } catch (e) {
      throw new HttpException('Update', HttpStatus.FORBIDDEN);
    }
  }
}
