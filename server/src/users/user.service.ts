import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { FileService } from '../file/file.service';
import { AuthService } from '../auth/auth.service';
import { DtoProfile } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private fileService: FileService,
  ) {}

  async Select(id: string): Promise<DtoProfile> {
    const profile = await this.One('id', id);
    const { password, isActive, code, created_at, updated_at, ...other } =
      profile;
    return other;
  }

  async One(props: string, val: string, relation?: string): Promise<UserDto> {
    const looking = relation.length
      ? { where: { [props]: val }, relations: [relation] }
      : { where: { [props]: val } };
    const profile = await this.usersRepository.findOne(looking);
    return profile;
  }

  async Create(user: DtoProfile): Promise<UserDto> {
    const create = await this.usersRepository.create(user);
    const profile = await this.usersRepository.save(create);
    return profile;
  }

  async Exist(props: string, val: string): Promise<boolean> {
    const profile = await this.One(props, val);
    return profile ? true : false;
  }

  async Update(criteria: string, user: DtoProfile): Promise<any> {
    const { id, ...rest } = user;
    const update = await this.usersRepository
      .update({ [criteria]: user[criteria] }, { ...rest })
      .then(async (response) => {
        return await this.usersRepository.findOne({
          where: { [criteria]: user[criteria] },
        });
      })
      .catch(
        () =>
          new HttpException(
            'At has occurred mistake when update user',
            HttpStatus.FORBIDDEN,
          ),
      );
    return update;
  }

  async UpdateUser(
    id: string,
    data: { filed: string; value: string },
  ): Promise<{ access_token: string }> {
    const update = await this.Update('id', {
      id: id,
      [data.filed]: data.value,
    });
    const token = await this.authService.CreatToken(update);
    return token;
  }

  async UpdateAvatar(
    id,
    image: Express.Multer.File,
  ): Promise<{ access_token: string }> {
    const user = await this.One('id', id);
    if (user.avatar !== '') await this.fileService.DelFile(user.avatar);
    const avatar = await this.fileService.LoadFile(image);
    const update = await this.Update('id', { ...user, avatar: avatar });
    const token = await this.authService.CreatToken(update);
    return token;
  }
}
