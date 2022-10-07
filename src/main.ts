import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './logger/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
    }),
  );
  // const config = new BaseAPIDocument().initializeOptions();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('', app, document);

  const port = 3000;
  await app.listen(port);
  app.enableCors({
    origin: '*c',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  Logger.log(`Application running on port${port} `);
}
bootstrap();
