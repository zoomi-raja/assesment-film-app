import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export default function (): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: 'films_db',
    port: 3306,
    logging: false,
    username: 'user',
    password: 'password',
    database: 'films',
    entities: ['./**/*.entity{.ts,.js}'],
    synchronize: false,
  };
}
