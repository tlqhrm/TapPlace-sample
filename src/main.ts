import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
    }),
  );
  const port = 3000;
  await app.listen(port);
  Logger.log(`Application running on port${port} `);
}
bootstrap();
