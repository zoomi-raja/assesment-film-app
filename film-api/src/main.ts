import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { ValidationFilter } from './filters/validation.filter';
import { ServerErrorFilter } from './filters/server.error.filter';
import { ValidationException } from './exceptions/validation.exception';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /** handle dublicate db, 500 and validation error application vise */
  app.useGlobalFilters(new ServerErrorFilter(), new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors);
      },
    }),
  );
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
