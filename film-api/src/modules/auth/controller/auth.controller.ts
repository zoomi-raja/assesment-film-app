import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Req() req: Request) {
    return { user: req };
  }

  @Post('/register')
  async register(
    @Body() user: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(user);
    //set cookie
    const token = this.authService.generateJWT(result);
    response.cookie('jwt-session', token.access_token);
    return result;
  }
}
