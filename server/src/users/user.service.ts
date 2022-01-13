import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async Select(id: string): Promise<UserDto> {
    const profile = await this.One('id', id);
    const { password, isActive, code, created_at, updated_at, ...other } =
      profile;
    return other;
  }

  async One(props: string, val: string): Promise<UserDto> {
    const profile = await this.usersRepository.findOne({
      where: { [props]: val },
    });
    return profile;
  }

  async Create(user: UserDto): Promise<UserDto> {
    const create = await this.usersRepository.create(user);
    const profile = await this.usersRepository.save(create);
    return profile;
  }

  async Exist(props: string, val: string): Promise<boolean> {
    const profile = await this.One(props, val);
    return profile ? true : false;
  }

  async Update(props: string, user: UserDto): Promise<any> {
    const { id, ...rest } = user;
    const profile = await this.One('id', user.id);
    if (!profile)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Such user don't exist`,
        },
        HttpStatus.FORBIDDEN,
      );
    const update = await this.usersRepository.update(
      { [props]: user[props] },
      { ...rest },
    );
    return update;
  }
}
