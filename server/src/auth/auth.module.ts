import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { UserModule } from '../users/user.module';
import { FileModule } from '../file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './strategy/jwt.strategy';

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_WORD,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
    UserModule,
    FileModule,
  ],
  providers: [
    AuthService,
    GithubStrategy,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
