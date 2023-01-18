import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { env } from 'common/env';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private primsa: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);

    //save user in the table
    try {
      const user = await this.primsa.user.create({
        data: {
          email: dto.email,
          hash,
          first_name: '',
          last_last: '',
        },
      });
      const token = await this.signToken(user.id, user.email);
      return { token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials token');
        }
      }
    }
  }
  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.primsa.user.findUnique({
      where: { email: dto.email },
    });
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect!');

    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect!');

    const token = await this.signToken(user.id, user.email);
    return { token };
  }

  private signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: env.jwt.secret,
    });
  }
}
