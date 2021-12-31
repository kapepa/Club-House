import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
