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
import { StoreMapper } from 'src/store/store.mapper';
import { storeRepository } from 'src/repositories/store.repository';
import { appleJCBRepository } from 'src/repositories/pays/apple_jcb.repository';
import { zeropayRepository } from 'src/repositories/pays/zeropay.repository';
import { conlessVisaRepository } from 'src/repositories/pays/conless_visa.repository';
import { conlessMasterRepository } from 'src/repositories/pays/conless_master.repository';
import { conlessAmexRepository } from 'src/repositories/pays/conless_amex.repository';
import { conlessUnionRepository } from 'src/repositories/pays/conless_union.repository';
import { conlessJcbRepository } from 'src/repositories/pays/conless_jcb.repository';
import { googleVisaRepository } from 'src/repositories/pays/google_visa.repository';
import { googleMasterRepository } from 'src/repositories/pays/google_master.repository';
import { googleMaestroRepository } from 'src/repositories/pays/google_maestro.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PayController],
  providers: [
    PayService,
    PayMapper,
    ...appleMasterRepository,
    ...appleVisaRepository,
    ...appleJCBRepository,
    ...paycoRepository,
    ...kakaoPayRepository,
    ...naverPayRepository,
    ...zeropayRepository,
    ...conlessVisaRepository,
    ...conlessMasterRepository,
    ...conlessAmexRepository,
    ...conlessUnionRepository,
    ...conlessJcbRepository,
    ...googleVisaRepository,
    ...googleMasterRepository,
    ...googleMaestroRepository,
    StoreMapper,
    ...storeRepository,
  ],
  exports: [PayMapper],
})
export class PayModule {}
