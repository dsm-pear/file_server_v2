import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  AdminForbiddenException,
  UnauthorizedTokenException,
} from '../exception/exception.index';
import { TokenPayload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<{ sub: string }> {
    if (payload.type !== 'access') {
      throw UnauthorizedTokenException;
    }

    if (payload.role !== 'user') {
      throw AdminForbiddenException;
    }

    return { sub: payload.sub };
  }
}

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<{ sub: string }> {
    if (payload.type !== 'access') {
      throw UnauthorizedTokenException;
    }

    if (payload.role == 'user') {
      throw AdminForbiddenException;
    }

    return { sub: payload.sub };
  }
}
