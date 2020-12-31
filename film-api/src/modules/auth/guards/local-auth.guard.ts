import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private resp: Response;
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    this.resp = ctx.getResponse<Response>();
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    /**once used strategy will have user if credentials are valid */
    if (err || !user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
