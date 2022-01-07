import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { config } from 'dotenv';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/static'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [User],
      synchronize: true,
    }),
    RoomModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
