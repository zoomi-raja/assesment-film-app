import { Genre } from '../../genre/models/genre.interface';
export interface Film {
  id?: number;
  name: string;
  photo: string;
  genres?: Genre[];
  genre_ids?: number[];
  rating: number;
  country: string;
  rel_date: string;
  description: string;
  ticket_price: number;
  created_at?: Date;
  updated_at?: Date;
}
