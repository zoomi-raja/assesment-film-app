import { GenreEntity } from '../models/genre.entity';
import { ConfigModule } from '@nestjs/config';
import { GenreService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import typeORMConfig from '../../../config/test.config';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig()),
        TypeOrmModule.forFeature([GenreEntity]),
      ],
      providers: [GenreService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
