import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './models/genre.entity';
import { GenreService } from './service/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}
