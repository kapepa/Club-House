import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './room.entyty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), UserModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
