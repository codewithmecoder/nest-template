import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    if (data) return req.user[data];
    return req.user;
  },
);
