export interface Comment {
  id?: number;
  name: string;
  comment: string;
  film_id: number;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
