import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const unauthorizedTokenException = new UnauthorizedException(
  'Unauthorized Token',
);

export const adminForbiddenException = new ForbiddenException('Forbidden');
export const userForbiddenException = new ForbiddenException(
  'Not allowed to access file',
);

export const FileNotFoundException = new NotFoundException('File Not Found');
export const ReportNotFoundException = new NotFoundException(
  'Report Not Found',
);
