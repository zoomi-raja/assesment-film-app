import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from '../comment/comment.module';
import { GenreModule } from '../genre/genre.module';
import { FilmController } from './controller/film.controller';
import { FilmEntity } from './models/film.entity';
import { FilmService } from './service/film.service';

@Module({
  imports: [GenreModule, CommentModule, TypeOrmModule.forFeature([FilmEntity])],
  providers: [FilmService],
  controllers: [FilmController],
})
export class FilmModule {}
