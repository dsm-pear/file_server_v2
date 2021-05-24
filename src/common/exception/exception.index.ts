import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const ReportFilesBadQueryException = new BadRequestException(
  'Query Bad Request',
);
export const TokenBadException = new BadRequestException('Token Bad Request');

export const UnauthorizedTokenException = new UnauthorizedException(
  'Unauthorized Token',
);

export const AdminForbiddenException = new ForbiddenException('Forbidden');
export const UserForbiddenException = new ForbiddenException(
  'Not allowed to access file',
);

export const FileNotFoundException = new NotFoundException('File Not Found');
export const ReportNotFoundException = new NotFoundException(
  'Report Not Found',
);
