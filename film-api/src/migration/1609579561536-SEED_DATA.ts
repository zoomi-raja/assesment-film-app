import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../utilities/hash';

import { FilmEntity } from '../modules/film/models/film.entity';
import { UserEntity } from '../modules/user/models/user.entity';
import { GenreEntity } from '../modules/genre/models/genre.entity';
import { CommentEntity } from '../modules/comment/models/comment.entity';

export class SEEDDATA1609579561536 implements MigrationInterface {
  private user_id: number;
  /** genre dumy data */
  private async addGenres() {
    const genre = getRepository(GenreEntity).create({
      name: 'action',
    });
    await getRepository(GenreEntity).save(genre);
    const genre2 = getRepository(GenreEntity).create({
      name: 'adventure',
    });
    await getRepository(GenreEntity).save(genre2);
    const genre3 = getRepository(GenreEntity).create({
      name: 'horor',
    });
    await getRepository(GenreEntity).save(genre3);
  }
  /** user dumy data */
  private async addUser() {
    const user = getRepository(UserEntity).create({
      name: 'admin',
      email: 'admin@test.com',
      password: await hashPassword('password'),
    });
    this.user_id = await (await getRepository(UserEntity).save(user)).id;
    console.log(this.user_id, 'user_id');
  }

  /** dumy films */
  private async addFilms() {
    const film = getRepository(FilmEntity).create({
      name: 'avatar',
      slug: `Avatar_${Date.now()}`,
      photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
      rating: 3,
      country: 'USA',
      user_id: this.user_id,
      rel_date: '18 Dec 2009',
      description: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
      ticket_price: 100,
    });
    film.genres = await getRepository(GenreEntity).findByIds([1]);
    let film_id = await (await getRepository(FilmEntity).save(film)).id;
    await this.addComment(film_id);

    const film2 = getRepository(FilmEntity).create({
      name: 'gotham',
      slug: `gotham_${Date.now()}`,
      photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDI3ODYyODY4OV5BMl5BanBnXkFtZTgwNjE5NDMwMDI@._V1_SY1000_SX1500_AL_.jpg',
      rating: 3.5,
      country: 'USA',
      user_id: this.user_id,
      rel_date: '01 Aug 2014',
      description: 'The story behind Detective James Gordon\'s rise to prominence in Gotham City in the years before Batman\'s arrival.',
      ticket_price: 130,
    });
    film2.genres = await getRepository(GenreEntity).findByIds([1, 2]);
    film_id = await (await getRepository(FilmEntity).save(film2)).id;
    await this.addComment(film_id);

    const film3 = getRepository(FilmEntity).create({
      name: 'avatar',
      slug: `avatar_${Date.now()}`,
      photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg',
      rating: 4,
      country: 'USA',
      user_id: this.user_id,
      rel_date: '18 Dec 2009',
      description: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
      ticket_price: 130,
    });
    film3.genres = await getRepository(GenreEntity).findByIds([2, 3]);
    film_id = await (await getRepository(FilmEntity).save(film3)).id;
    await this.addComment(film_id);
  }

  /** fumy comment */
  private async addComment(film_id: number) {
    const comment = getRepository(CommentEntity).create({
      name: 'admin',
      comment: 'movie is good',
      user_id: this.user_id,
      film_id: film_id,
    });
    await getRepository(CommentEntity).save(comment);
  }

  public async up(): Promise<void> {
    /** add few genres */
    await this.addGenres();

    /** add user */
    await this.addUser();

    /** add films */
    await this.addFilms();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
/**
 * yarn typeorm migration:create --name SEED_DATA
 * yarn typeorm migration:run
 */
