import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Comment } from '../models/comment.interface';

export class CreateCmtDto implements Comment {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  comment: string;

  @IsEmpty()
  user_id: number;

  @IsOptional()
  film_id: number;

  @IsEmpty()
  created_at?: Date;

  @IsEmpty()
  updated_at?: Date;
}
