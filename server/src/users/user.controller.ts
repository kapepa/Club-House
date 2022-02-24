import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/one/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Receive one user',
    type: UserDto,
  })
  async One(@Param() id: string): Promise<any> {
    try {
      const user = await this.userService.One('id', id);
      return user;
    } catch (e) {
      throw new HttpException('One', HttpStatus.FORBIDDEN);
    }
  }

  @Post('/own')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
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
  async Update(@Req() req, @Body() body): Promise<{ access_token: string }> {
    try {
      return await this.userService.UpdateUser(req.user.userId, body);
    } catch (e) {
      throw new HttpException('Update', HttpStatus.FORBIDDEN);
    }
  }

  @Post('/avatar')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Update user avatar ',
    type: UserDto,
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  async AvatarUpdate(
    @Req() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<{ access_token: string }> {
    const file = JSON.parse(JSON.stringify(files));
    const update = await this.userService.AvatarUpdate(
      req.user.userId,
      file.avatar[0],
    );
    return update;
  }
}
