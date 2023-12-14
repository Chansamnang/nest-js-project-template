import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: Repository<UserRepository>,
  ) {}

  getInfo(userId: number) {
    return 'not yet implemented';
  }
}
