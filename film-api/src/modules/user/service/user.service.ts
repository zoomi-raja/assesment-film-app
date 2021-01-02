import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';

import { hashPassword } from '../../../utilities/hash';
import { DublicateException, Error } from '../../../exceptions/dublicate.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    // email should be unique
    const userInfo: UserEntity = await this.userRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: user.email })
      .getOne();
    if (userInfo) {
      const errors: Error[] = [];
      if (userInfo.email == user.email) errors.push({ entity: 'email' });
      throw new DublicateException(errors);
    }
    //hashpassword
    user.password = await hashPassword(user.password);

    const userObj = await this.userRepository.save(user);
    //strip of password
    const { password, ...result } = userObj;
    return result;
  }

  /** get user by email */
  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ email }],
    });
  }
}
