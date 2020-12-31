import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export default function (): TypeOrmModuleOptions {
    return {
        // 'logging': true,
        'type': 'mysql',
        'host': process.env.DB_HOST,
        'port': 3306,
        'username': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_NAME,
        'entities': ['dist/**/*.entity{.ts,.js}'],
        'synchronize': process.env.NODE_ENV == 'production'? false : true
    }
};