import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Genre } from '../models/genre.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from '../models/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}
  /** get genres from ids */
  async getGenresByIds(ids: number[]): Promise<Genre[]> {
    if (ids.length <= 0) {
      return [];
    }
    return await this.genreRepository.findByIds(ids);
  }
  /** get all genres */
  async getGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }
  /** create genre entry in storage */
  async saveFilm(genre: Genre): Promise<Genre> {
    return this.genreRepository.save(genre);
  }
}
