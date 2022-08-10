import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { PayModule } from './pay/pay.module';
import { PaylistModule } from './paylist/paylist.module';
import { UserlogModule } from './userlog/userlog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    PayModule,
    PaylistModule,
    StoreModule,
    UserlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
