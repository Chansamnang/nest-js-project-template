import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';

@Controller('user')
@ApiTags('User Management')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getInfo(@Request() req) {
    console.log('user', req.user);
    return this.userService.getInfo(req.user.id);
  }
}
