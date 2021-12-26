import { Module } from '@nestjs/common';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';

@Module({
  imports: [RoomModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class AppModule {}
