import {
  Max,
  Min,
  IsInt,
  Length,
  IsEmpty,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Genre } from 'src/modules/genre/models/genre.interface';
import { Film } from '../models/film.interface';

export class CreateDto implements Film {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  photo: string;

  @IsEmpty()
  genres: Genre[];

  @IsNotEmpty()
  genre_ids: number[];

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  rel_date: string;

  @Length(10, 450)
  description: string;

  @IsInt()
  ticket_price: number;

  @IsEmpty()
  created_at?: Date;

  @IsEmpty()
  updated_at?: Date;
}
