import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';

import type { User } from './user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
