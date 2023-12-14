import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    public userRepository: UserRepository,
  ) {}
  login(body: LoginDto) {
    return this.userRepository.login(body);
  }
  register(body: RegisterDto) {
    return this.userRepository.register(body);
  }
}
