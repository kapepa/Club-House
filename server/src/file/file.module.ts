import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
