import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
@ApiTags('Auth Management')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
