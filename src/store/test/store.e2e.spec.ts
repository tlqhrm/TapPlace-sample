import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { StoreModule } from '../store.module';
import { StoreService } from '../store.service';
import { StoreMapper } from '../store.mapper';
import { storeRepository } from 'src/repositories/store.repository';
import { DatabaseModule } from 'src/database/database.module';
import { Store } from 'src/entities/store.entity';
import { AppModule } from 'src/app.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

describe('Store', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter(Logger));
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  describe('Around', () => {
    it(`correct request body`, async () => {
      const res = await request(app.getHttpServer())
        .post('/store/around')
        .send({
          x1: '127.027383829781',
          y1: '37.4978999991414',
          pays: [
            'naverpay',
            'apple_visa',
            'kakaopay',
            'payco',
            'google_master',
            'google_visa',
            'zeropay',
          ],
          distance: 0.008,
          user_id: '11111111-1111-1111-1111-111111111111',
        })
        .expect(200);
      await expect(res['body']).toEqual({ stores: [] });
    });

    it(`wrong request body`, async () => {
      const res = await request(app.getHttpServer())
        .post('/store/around')
        .send({
          x1: '127.027383829781',
          y1: '37.4978999991414',
          pays: ['naverpay'],
          distance: 1,
          user_id: 'asd',
        })
        .expect(400);
      await expect(res['body']['message']).toEqual(['user_id must be a UUID']);
    });
  });
});
