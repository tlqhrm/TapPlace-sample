import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PayMapper } from './pay.mapper';
import { paycoRepository } from 'src/repositories/pays/payco.repository';
import { appleMasterRepository } from 'src/repositories/pays/apple_master.repository';
import { kakaoPayRepository } from 'src/repositories/pays/kakaopay.repository';
import { naverPayRepository } from 'src/repositories/pays/naverpay.repository';
import { appleVisaRepository } from 'src/repositories/pays/apple_visa.repository';
import { StoreModule } from 'src/store/store.module';
import { StoreMapper } from 'src/store/store.mapper';
import { storeRepository } from 'src/repositories/store.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PayController],
  providers: [
    PayService,
    PayMapper,
    ...appleMasterRepository,
    ...appleVisaRepository,
    ...paycoRepository,
    ...kakaoPayRepository,
    ...naverPayRepository,
    StoreMapper,
    ...storeRepository,
  ],
  exports: [PayMapper],
})
export class PayModule {}
