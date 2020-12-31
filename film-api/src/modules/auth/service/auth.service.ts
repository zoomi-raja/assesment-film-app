import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/models/user.interface';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from 'src/modules/user/service/user.service';
import { DublicateException, Error } from 'src/exceptions/dublicate.exception';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
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
}
