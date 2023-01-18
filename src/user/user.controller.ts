import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllAuthGuardTypes } from 'src/auth/strategy';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard(AllAuthGuardTypes))
  @Get('me')
  getMe() {
    return 'user into';
  }
}
