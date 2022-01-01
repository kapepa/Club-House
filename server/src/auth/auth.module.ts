import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, GithubStrategy, GoogleStrategy, FacebookStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
