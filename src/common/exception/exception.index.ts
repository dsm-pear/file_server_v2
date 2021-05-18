import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const unauthorizedTokenException = new UnauthorizedException(
  'Unauthorized Token',
);

export const FileNotFoundException = new NotFoundException('File Not Found');

export const adminForbiddenException = new ForbiddenException('Forbidden');
