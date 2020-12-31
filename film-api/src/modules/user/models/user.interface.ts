export interface User {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}