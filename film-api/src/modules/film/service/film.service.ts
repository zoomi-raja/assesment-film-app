import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DublicateException, Error } from 'src/exceptions/dublicate.exception';
import { GenreService } from 'src/modules/genre/service/genre.service';
import { Paginate } from 'src/utilities/paginate';
import { Repository } from 'typeorm';
import { FilmEntity } from '../models/film.entity';
import { Film } from '../models/film.interface';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    private genreService: GenreService,
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
        relations: ['genres'],
      },
    );
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
