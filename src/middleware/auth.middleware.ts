import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  EXCLUDED_ROUTES = ['/api/auth/register', '/api/auth/login'];
  async use(req: any, res: any, next: (error?: any) => void) {
    const apiUrl = req.baseUrl.replace(/\/[a-f0-9-]+$/, '');
    if (this.EXCLUDED_ROUTES.includes(apiUrl)) {
      next();
    } else {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const session = await this.userRepository.findSessionToken(token);

        if (!session || session.is_expired === true) {
          throw new UnauthorizedException('Token is invalid');
        }

        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        const user = await this.userRepository.findById(decoded.sub);

        if (!user.status) {
          throw new UnauthorizedException('unauthorized access');
        }
        req.user = user;
        req.user.token = token;
        next();
      } else {
        throw new UnauthorizedException('Token is required');
      }
    }
  }
}
