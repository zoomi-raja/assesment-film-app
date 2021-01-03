import { Controller, Get } from '@nestjs/common';
import { GenreService } from '../service/genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}
  @Get('/')
  async getProfile() {
    return await this.genreService.getGenres();
  }
}
