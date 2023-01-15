import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private primsa: PrismaService) {}
  signup() {
    return { message: 'I am the sign up function!' };
  }
  signin() {
    return { message: 'I am the sign in function!' };
  }
}
