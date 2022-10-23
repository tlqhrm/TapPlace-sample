import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreMapper } from './store.mapper';
import { storeRepository } from 'src/repositories/store.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreMapper, ...storeRepository, JwtStrategy],
  exports: [StoreMapper, ...storeRepository],
})
export class StoreModule {}
