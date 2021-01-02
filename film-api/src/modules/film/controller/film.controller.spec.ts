import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { FilmEntity } from '../models/film.entity';
import { FilmService } from '../service/film.service';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { FilmController } from './film.controller';

import { AuthModule } from '../../auth/auth.module';
import typeORMConfig from '../../../config/test.config';
import { GenreModule } from '../../genre/genre.module';
import { CommentModule } from '../../comment/comment.module';

describe('FilmController', () => {
  let controller: FilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        GenreModule,
        CommentModule,
        PassportModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({
          secret: 'testSecret',
        }),
        TypeOrmModule.forRoot(typeORMConfig()),
        TypeOrmModule.forFeature([FilmEntity]),
      ],
      providers: [FilmService, JwtStrategy],
      controllers: [FilmController],
    }).compile();

    controller = module.get<FilmController>(FilmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
