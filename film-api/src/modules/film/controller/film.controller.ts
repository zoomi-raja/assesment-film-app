import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDto } from '../dto/create.dto';
import { FilmService } from '../service/film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}
  @Get('/')
  getFilms() {
    return this.filmService.getList();
  }
  /**Create Movie */
  @Post('/')
  async createFilm(@Body() film: CreateDto): Promise<any> {
    return await this.filmService.saveFilm(film);
  }
}
