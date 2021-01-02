import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateCmtDto } from 'src/modules/comment/dto/createCmt.dto';
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

  /** add comment to film */
  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  async createFilmComment(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
    @Body() comment: CreateCmtDto,
  ): Promise<any> {
    comment.film_id = id;
    comment.user_id = request.user.id;
    return await this.filmService.saveComment(comment);
  }
}
