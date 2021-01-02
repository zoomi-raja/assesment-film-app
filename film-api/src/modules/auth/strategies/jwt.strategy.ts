import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../service/auth.service';

function cookieExtractor(req: Request) {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt-session'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // todo lokup in session table
    // refresh token if time about to expire
    return payload;
  }
}
