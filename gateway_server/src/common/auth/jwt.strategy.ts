import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiResult } from '../api_result';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwtSecret'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp
    };
  }
}

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (info?.name === 'TokenExpiredError') {
      throw ApiResult.SESSION_EXPIRED;
    }
    if (err || !user) {
      throw err || ApiResult.INVALID_SESSION; 
    }
    return user;
  }
}