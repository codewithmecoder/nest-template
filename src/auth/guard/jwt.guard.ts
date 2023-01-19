import { AuthGuard } from '@nestjs/passport';
import { AuthGuardType } from '../strategy';

export class JwtGuard extends AuthGuard(AuthGuardType.jwt) {
  constructor() {
    super();
  }
}
