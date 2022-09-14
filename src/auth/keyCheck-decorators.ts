import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const keyCheck = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request['body']['key'];
});
