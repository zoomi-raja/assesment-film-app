import { User } from '../../user/models/user.interface';
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto implements User {
  id?: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordRe: string;

  @IsOptional()
  avatar?: string;

  @IsEmpty()
  created_at?: Date;

  @IsEmpty()
  updated_at?: Date;
}
