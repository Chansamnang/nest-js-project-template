import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepositor: UserRepository,
  ) {}

  EXCLUDED_ROUTES = ['/api/auth/register', '/api/auth/login'];
  use(req: any, res: any, next: (error?: any) => void) {
    const apiUrl = req.baseUrl.replace(/\/[a-f0-9-]+$/, '');
    if (this.EXCLUDED_ROUTES.includes(apiUrl)) {
      next();
    } else {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Token is required');
      }
      next();
    }
  }
}
