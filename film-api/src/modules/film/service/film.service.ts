import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Comment } from '../../comment/models/comment.interface';
import { GenreService } from '../../genre/service/genre.service';
import { CommentService } from '../../comment/service/comment.service';
import { DublicateException, Error } from '../../../exceptions/dublicate.exception';

import { Repository } from 'typeorm';
import { Film } from '../models/film.interface';
import { Paginate } from '../../../utilities/paginate';
import { FilmEntity } from '../models/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    private genreService: GenreService,
    private commentService: CommentService,
  ) {}
  /** create film entry in storage */
  async saveFilm(film: Film): Promise<Film> {
    film.slug = `${film.name}-${Date.now()}`;
    film.genres = await this.genreService.getGenresByIds(film.genre_ids);
    /** validate if provided genre exists */
    if (film.genres.length <= 0) {
      const errors: Error[] = [];
      errors.push({ entity: 'genres', message: 'invalid genres value' });
      throw new DublicateException(errors);
    }
    return this.filmRepository.save(film);
  }
  /** get record list */
  async getList(): Promise<Paginate> {
    const [items, count] = await this.filmRepository.findAndCount({
      relations: ['genres'],
      /** todo can add pagination here */
      skip: 0,
      take: 100,
    });
    return {
      items,
      count,
    };
  }
  /** get by id */
  async getFilm(id: number): Promise<Film> {
    return await this.filmRepository.findOne(id, {
      relations: ['genres'],
    });
  }

  /** get by slug */
  async getFilmBySlug(slug: string): Promise<Film> {
    const result = await this.filmRepository.findOne(
      {
        slug,
      },
      {
        relations: ['genres', 'comments'],
      },
    );
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
  /** save film comment */
  async saveComment(comment: Comment): Promise<Comment> {
    const film = await this.filmRepository.findOne(comment.film_id);
    if (!film) {
      throw new NotFoundException('no such movie exists in database');
    }
    return await this.commentService.saveFilm(comment);
  }
}
