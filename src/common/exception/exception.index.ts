import { UnauthorizedException } from '@nestjs/common';

export const unauthorizedTokenException = new UnauthorizedException(
  'Unauthorized Token',
);
