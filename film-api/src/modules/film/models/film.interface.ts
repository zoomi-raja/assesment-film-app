import { Genre } from '../../genre/models/genre.interface';
import { Comment } from 'src/modules/comment/models/comment.interface';

export interface Film {
  id?: number;
  name: string;
  slug?: string;
  photo: string;
  genres?: Genre[];
  genre_ids?: number[];
  user_id?: number;
  rating: number;
  country: string;
  rel_date: string;
  description: string;
  comments?: Comment[];
  ticket_price: number;
  created_at?: Date;
  updated_at?: Date;
}
