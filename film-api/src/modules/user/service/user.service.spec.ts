import { Test, TestingModule } from '@nestjs/testing';

import { UserEntity } from '../models/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeORMConfig from '../../../config/test.config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig()),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
