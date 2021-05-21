import { Request } from 'express';
import { TokenPayload } from './payload.interface';

export interface IUserReqeust extends Request {
  user: TokenPayload;
}
