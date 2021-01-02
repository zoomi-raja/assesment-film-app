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
import { Film } from '../models/film.interface';
import { Genre } from '../../genre/models/genre.interface';

export class CreateDto implements Film {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsEmpty()
  slug: string;

  @IsEmpty()
  user_id: number;

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
