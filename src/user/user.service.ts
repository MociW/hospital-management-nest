import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
  ) {}

  async create(email: string, name: string) {
    const user = this.userRepository.create({ email, name });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
