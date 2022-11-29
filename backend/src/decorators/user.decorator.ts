import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ExpressRequestInterface } from 'src/interfaces';

export const AuthUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

  console.log('rr', request)

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});