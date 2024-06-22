import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ always: true, transform: true }));

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 2000);
}
bootstrap();
