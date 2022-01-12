import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserDto } from '../dto/user.dto';
import { DtoLoginReq, DtoLoginRes, DtoRegistrationRes } from './dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/confirmed')
  @ApiResponse({
    status: 200,
    description: 'Confirmed code registration user',
  })
  async Confirmed(
    @Body() body: { id: string; code: string },
  ): Promise<{ access_token?: string; message: string; error: boolean }> {
    console.log(body);
    const user = await this.authService.ConfirmedCode(body);
    return user;
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Login and password user',
  })
  async Login(@Body() body: DtoLoginReq): Promise<DtoLoginRes> {
    const user = await this.authService.Login(body);
    return user;
  }

  @Post('/registration')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  @ApiResponse({
    status: 200,
    description: 'Registaration new user',
  })
  async Registration(
    @UploadedFiles() files: Array<Express.Multer.File> | string,
    @Body() body: UserDto,
  ): Promise<DtoRegistrationRes> {
    try {
      const parseBody = { ...JSON.parse(JSON.stringify(body)) };
      const user = Object.assign(
        parseBody.hasOwnProperty('avatar')
          ? parseBody
          : {
              avatar: JSON.parse(JSON.stringify(files)).avatar[0],
              ...parseBody,
            },
        body,
      );
      const profile = await this.authService.Registration(user);
      return profile;
    } catch (e) {
      throw new HttpException('Registration', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  @ApiResponse({
    status: 200,
    description: 'Open github for auth',
  })
  async GitHub(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException('GitHub', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  @ApiResponse({
    status: 200,
    description: 'Receive data from gitnub and save',
    type: User,
  })
  async GitHubRedirect(
    @Req() req: { Request; user: any },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.GithubLogin({
        email: '',
        password: '',
        username: req.user.username,
        fullname: req.user.displayName,
        avatar: req.user.photos[0].value,
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException('GitHubRedirect', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: 200,
    description: 'Open google for auth',
  })
  async Google(@Req() req): Promise<HttpStatus> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException('Google', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google/redirect')
  @ApiResponse({
    status: 200,
    description: 'Receive data from google and save',
    type: User,
  })
  async GoogleRedirect(
    @Req() req: { Request; user: any },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.GoogleLogin({
        email: req.user.email,
        password: '',
        username: req.user.firstName,
        fullname: req.user.lastName,
        avatar: req.user.picture,
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException('GoogleRedirect', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook')
  async Facebook(@Req() req): Promise<any> {
    try {
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException('Facebook', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook/redirect')
  async FacebookRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.authService.FacebookLogin({
        email: '',
        password: '',
        username: '',
        fullname: '',
        avatar: '',
        isActive: false,
        phone: '',
        code: '',
      });
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify(
          user,
        )}, '*'); window.close();</script>`,
      );
    } catch (e) {
      throw new HttpException('FacebookRedirect', HttpStatus.FORBIDDEN);
    }
  }
}
