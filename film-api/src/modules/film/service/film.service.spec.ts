import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from '../models/film.entity';
import { FilmService } from './film.service';

import typeORMConfig from '../../../config/test.config';
import { GenreModule } from '../../genre/genre.module';
import { CommentModule } from '../../comment/comment.module';

describe('FilmService', () => {
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GenreModule,
        CommentModule,
        TypeOrmModule.forRoot(typeORMConfig()),
        TypeOrmModule.forFeature([FilmEntity]),
      ],
      providers: [FilmService],
    }).compile();

    service = module.get<FilmService>(FilmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
