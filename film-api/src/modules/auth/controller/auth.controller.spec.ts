import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UserEntity } from '../../user/models/user.entity';
import { UserModule } from '../../user/user.module';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from './auth.controller';

import typeORMConfig from '../../../config/test.config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        /**JWT dependency injection */
        JwtModule.register({
          secret: 'testSecret',
        }),
        TypeOrmModule.forRoot(typeORMConfig()),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
