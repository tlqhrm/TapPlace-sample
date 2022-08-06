import { Inject, Injectable } from '@nestjs/common';
import { AppleMaster } from 'src/entities/pays/apple_master.entity';
import { AppleVisa } from 'src/entities/pays/apple_visa.entity';
import { Kakaopay } from 'src/entities/pays/kakaopay.entity';
import { Naverpay } from 'src/entities/pays/naverpay.entity';
import { Payco } from 'src/entities/pays/pacyco.entity';
import { Repository } from 'typeorm';
import { CreatePayDto } from './dto/create-pay.dto';

@Injectable()
export class PayMapper {
  constructor(
    @Inject('APPLE_VISA_REPOSITORY')
    private appleVisaRepository: Repository<AppleVisa>,
    @Inject('APPLE_MASTER_REPOSITORY')
    private appleMasterRepository: Repository<AppleMaster>,
    @Inject('KAKAOPAY_REPOSITORY')
    private kakaoPayRepository: Repository<Kakaopay>,
    @Inject('NAVERPAY_REPOSITORY')
    private naverPayRepository: Repository<Naverpay>,
    @Inject('PAYCO_REPOSITORY')
    private paycoRepository: Repository<Payco>,
  ) {}

  async createPay(createPayDto: CreatePayDto) {
    const { store_id, whatPay } = createPayDto;
    const pay = eval('this.' + whatPay + 'Repository').create({
      store_id,
    });

    await eval('this.' + whatPay + 'Repository').save(pay);

    return pay;
  }
}
