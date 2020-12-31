import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './config/database.config';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    /** enable env file for project globally */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /** Database configs */
    TypeOrmModule.forRoot(typeORMConfig()),
    /**bootstrap app */
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
