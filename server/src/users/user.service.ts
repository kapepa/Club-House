import { Injectable } from '@nestjs/common';
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

  async One(): Promise<any> {
    return 'sadsda';
  }

  async Create(user: UserDto): Promise<UserDto> {
    const create = this.usersRepository.create(user);
    const profile = await this.usersRepository.save(create);
    return profile;
  }
}
