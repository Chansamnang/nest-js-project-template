import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';

@Controller('user')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getInfo(@Request() req) {
    return this.userService.getInfo(1);
  }
}
