import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LogRepository } from './repositories/log.repository';
import { Log } from './entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Session, Log]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AppService,
    AuthService,
    UserRepository,
    JwtService,
    UserService,
    LogRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
