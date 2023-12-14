import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/auth/register.dto';
import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/auth/login.dto';
import { Session } from 'src/entities/session.entity';
import { ApiResponse } from 'src/utils/api-response.util';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private readonly jwtService: JwtService,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async register(body: RegisterDto) {
    const { username, password } = body;
    const oldUser = await this.userRepository.findOne({
      where: { username: username },
    });

    if (oldUser) {
      throw new BadRequestException('User already register');
    }

    const saltOrRounds = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const user = this.userRepository.create({
      username: username,
      password: hashPassword,
      status: true,
    });

    await this.userRepository.save(user);

    return 'Register Sucessfully';
  }

  async login(body: LoginDto) {
    const { username, password } = body;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.status) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'account is disable',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'username/password is incorrect',
      });
    }

    const token = await this.generateToken(user);
    await this.createSession(token, user);
    // const {user.username, user.status} = user;
    return ApiResponse(
      {
        username: user.username,
        status: user.status,
        token: token.token,
      },
      HttpStatus.OK,
    );
  }

  async createSession(tokenDetail: any, userInfo: User) {
    const expireAt = new Date(Date.now() + 3600 * (1000 * 240)); // 10 Days
    const userToDelete = await this.sessionRepository.findOne({
      relations: ['user'],
      where: { user: { id: Equal(userInfo.id) } },
    });
    if (userToDelete) {
      await this.sessionRepository.delete(userToDelete);
    }

    const session = this.sessionRepository.create({
      token: tokenDetail.token,
      string_token: tokenDetail.tokenString,
      user: userInfo,
      expires_at: expireAt,
      is_expired: false,
    });

    await this.sessionRepository.save(session);
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findSessionToken(token: string) {
    const session = await this.sessionRepository.findOne({
      where: { token: token },
    });
    return session;
  }

  async generateToken(user: User) {
    const saltOrRounds = 10;
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    const tokenString = await bcrypt.hash(token, saltOrRounds);

    return {
      token,
      tokenString,
    };
  }
}
