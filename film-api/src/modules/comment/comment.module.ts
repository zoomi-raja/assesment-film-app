import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './models/comment.entity';
import { CommentService } from './service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  exports: [CommentService],
  providers: [CommentService],
})
export class CommentModule {}
