import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';

import { User } from 'src/modules/user/models/user.interface';
import { UserService } from 'src/modules/user/service/user.service';
import { DublicateException, Error } from 'src/exceptions/dublicate.exception';
import { comparePasswords } from 'src/utilities/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  /**Register user */
  async register(user: RegisterDto): Promise<User> {
    //password should match
    if (user.password != user.passwordRe) {
      const errors: Error[] = [];
      errors.push({ entity: 'passwordRe', message: 'password do not match' });
      throw new DublicateException(errors);
    } else {
      delete user.passwordRe;
    }
    return this.userService.create(user);
  }
  /**validate user credentials */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  /**generate jwt */
  generateJWT(user: any): { access_token: string } {
    return {
      access_token: this.jwtService.sign(user, {
        expiresIn: '1y',
      }),
    };
  }
}
