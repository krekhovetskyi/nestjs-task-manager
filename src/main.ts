import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { get } from 'config';
import { AppModule } from './app.module';


async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = get<number>('server.port');
  await app.listen(port);

  logger.log(`Application started on port ${port}`);
}

bootstrap();
