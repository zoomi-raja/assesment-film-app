import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateDto } from '../dto/create.dto';
import { Film } from '../models/film.interface';
import { FilmService } from '../service/film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}
  /** get listing */
  @Get('/')
  getFilms() {
    return this.filmService.getList();
  }

  /** get particular film */
  @Get(':slug')
  async getFilmInfo(@Param('slug') slug: string): Promise<Film> {
    return await this.filmService.getFilmBySlug(slug); //slug should be name_id
  }

  /**Create Movie */
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createFilm(@Req() request, @Body() film: CreateDto): Promise<any> {
    film.user_id = request.user.id;
    return await this.filmService.saveFilm(film);
  }
}
