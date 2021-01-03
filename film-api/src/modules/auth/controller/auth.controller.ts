import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) response) {
    const token = this.authService.generateJWT(req.user);
    response.cookie('jwt-session', token.access_token);
    return { user: req.user, token };
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
    return { user: result, token };
  }
}
