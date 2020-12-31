import { Body, Controller, Post, Req } from '@nestjs/common';
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
  async register(@Body() user: RegisterDto) {
    const result = await this.authService.register(user);
    return result;
  }
}
