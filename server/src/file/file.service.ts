import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async LoadFile(file: Express.Multer.File): Promise<string> {
    const staticFolder = join(__dirname, '..', '..', 'static');
    const uuidName = uuidv4();
    const extention = file.originalname.split('.').pop();
    const newName = `${uuidName}.${extention}`;
    const pathName = `${staticFolder}\\${uuidName}.${extention}`;
    const buffer = await sharp(Buffer.from(file.buffer))
      .resize(320, 320)
      .png()
      .toBuffer();

    if (file.size > 50000)
      throw new HttpException('File is large size', HttpStatus.FORBIDDEN);
    if (!fs.existsSync(staticFolder)) await fs.mkdirSync(staticFolder);

    await fs.writeFileSync(pathName, buffer);
    return newName;
  }
}
