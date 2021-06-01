import {
  TokenBadException,
  UserForbiddenException,
} from '../exception/exception.index';
import * as jwt from 'jsonwebtoken';

export const verifyTokenQuery = (token: string): Promise<void> => {
  console.log(token);
  if (!token) throw TokenBadException;
  const splitToken = token.split(' ');
  if (splitToken[0] !== 'Bearer') TokenBadException;
  const payload: any = jwt.verify(splitToken[1], process.env.JWT_SECRET);
  if (payload.type !== 'access') UserForbiddenException;
  return;
};
