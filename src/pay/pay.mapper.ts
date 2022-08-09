import { Inject, Injectable } from '@nestjs/common';
import { AppleMaster } from 'src/entities/pays/apple_master.entity';
import { AppleVisa } from 'src/entities/pays/apple_visa.entity';
import { Kakaopay } from 'src/entities/pays/kakaopay.entity';
import { Naverpay } from 'src/entities/pays/naverpay.entity';
import { Payco } from 'src/entities/pays/pacyco.entity';
import { Repository } from 'typeorm';
import { CreatePayDto } from './dto/create-pay.dto';
import { FeedbackDto } from './dto/feedbackdto';

@Injectable()
export class PayMapper {
  constructor(
    @Inject('APPLE_VISA_REPOSITORY')
    private apple_visaRepository: Repository<AppleVisa>,
    @Inject('APPLE_MASTER_REPOSITORY')
    private apple_masterRepository: Repository<AppleMaster>,
    @Inject('KAKAOPAY_REPOSITORY')
    private kakaopayRepository: Repository<Kakaopay>,
    @Inject('NAVERPAY_REPOSITORY')
    private naverpayRepository: Repository<Naverpay>,
    @Inject('PAYCO_REPOSITORY')
    private paycoRepository: Repository<Payco>,
  ) {}

  // 전달받은 pay 종류애따라 repository 동적으로 사용
  repo(what_pay) {
    return eval('this.' + what_pay + 'Repository');
  }

  //pay 만드는 쿼리
  async createPay(createPayDto: CreatePayDto): Promise<boolean> {
    const { store_id, pay } = createPayDto;
    const repo = this.repo(pay);

    const create = repo.create({
      store_id,
    });

    const result = await eval('this.' + pay + 'Repository').save(create);

    return result ? true : false;
  }

  //pay 가져오는 쿼리
  async getPay(store_id, pay) {
    const repo = this.repo(pay);
    return await repo.findOneBy({
      store_id,
    });
  }

  //pay 존재여부 확인 쿼리
  async payCheck(store_id, pay) {
    const repo = this.repo(pay);
    return await repo
      .createQueryBuilder('pay')
      .select(`EXISTS (SELECT * FROM ${pay}) as isChk`)
      .where(`store_id = ${store_id}`)
      .getRawOne();
  }

  //피드백
  async feedBack(feedbackDto: FeedbackDto): Promise<boolean> {
    const { store_id, pay, feed } = feedbackDto;
    const repo = this.repo(pay);

    const feedback = await this.successOrFail(repo, store_id, pay, feed);

    console.log(feedback);

    return feedback ? true : false;
  }

  // update에 동적으로 할당 못해서 만든 함수
  async successOrFail(repo, store_id, pay, feed) {
    if (feed === true) {
      return await repo
        .createQueryBuilder(pay)
        .update()
        .set({
          success: () => `success +1`,
        })
        .where(`store_id = ${store_id}`)
        .execute();
    } else {
      return await repo
        .createQueryBuilder(pay)
        .update()
        .set({
          fail: () => `fail +1`,
        })
        .where(`store_id = ${store_id}`)
        .execute();
    }
  }

  // async createStore(aroundStoreDto: AroundStoreDto): Promise<string | Store> {
  //   const { id, place_name, address_name, category_group_name, phone, x, y } =
  //     aroundStoreDto;
  //   const store = this.storeRepository.create({
  //     id,
  //     place_name,
  //     address_name,
  //     category_group_name,
  //     phone,
  //     x,
  //     y,
  //   });

  //   try {
  //     await this.storeRepository.save(store);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new HttpException(`store id : ${id} is existed`, 409);
  //     } else {
  //       throw new HttpException(`Unkown error please contact the manager`, 500);
  //     }
  //   }

  //   return store;
  // }
}
