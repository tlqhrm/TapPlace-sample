import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { PayModule } from './pay/pay.module';
import { PaylistModule } from './paylist/paylist.module';
import { UserlogModule } from './userlog/userlog.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { LoggerMiddleware } from './logger/logger.middleware';
import { winstonLogger } from './logger/winston.util';
import { NoticeModule } from './notice/notice.module';
import { TermsModule } from './terms/terms.module';
import { AdminModule } from './admin/admin.module';
import { QnaModule } from './qna/qna.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.dev.env'
          : process.env.NODE_ENV === 'prod'
          ? '.prod.env'
          : '.local.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'local').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    // WinstonModule.forRoot({
    //   level: 'info',
    //   format: winston.format.json(),
    //   defaultMeta: { service: 'user-service' },
    //   transports: [
    //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //     new winston.transports.File({ filename: 'combined.log' }),
    //   ],
    // }),
    DatabaseModule,
    UserModule,
    PayModule,
    PaylistModule,
    StoreModule,
    UserlogModule,
    NoticeModule,
    TermsModule,
    AdminModule,
    QnaModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
