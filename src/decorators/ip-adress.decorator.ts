import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator(
  (_, ctx: ExecutionContext): string | null => {
    const req = ctx.switchToHttp().getRequest();

    if (req.clientIp) return req.clientIp;

    return requestIp.getClientIp(req);
  },
);
