import { CommentEntity } from 'src/modules/comment/models/comment.entity';
import { GenreEntity } from 'src/modules/genre/models/genre.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  photo: string;

  @Column()
  user_id: number;

  @Column()
  rating: number;

  @Column()
  country: string;

  @Column()
  rel_date: string;

  @Column()
  description: string;

  @Column()
  ticket_price: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  /** many to many relation with genres */
  @ManyToMany(() => GenreEntity, (genre) => genre.films)
  @JoinTable({
    name: 'film_genre', //pivot table name
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: GenreEntity[];
  /** one to many relation with comments */
  @OneToMany(() => CommentEntity, (comment) => comment.comments)
  comments: CommentEntity[];
}
