import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../models/comment.entity';
import { Comment } from '../models/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  /** create comment entry in storage */
  async saveFilm(comment: Comment): Promise<Comment> {
    if (!comment.film_id || !comment.user_id)
      throw new UnprocessableEntityException();
    return this.commentRepository.save(comment);
  }
}
