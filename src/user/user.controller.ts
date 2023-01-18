import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AllAuthGuardTypes } from 'src/auth/strategy';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard(AllAuthGuardTypes))
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
