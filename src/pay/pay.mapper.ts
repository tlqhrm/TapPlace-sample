import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Pay } from 'src/entities/pay.entity';
import { AppleJcb } from 'src/entities/pays/apple_jcb.entity';
import { AppleMaster } from 'src/entities/pays/apple_master.entity';
import { AppleVisa } from 'src/entities/pays/apple_visa.entity';
import { ConlessAmex } from 'src/entities/pays/conless_amex.entity';
import { ConlessJcb } from 'src/entities/pays/conless_jcb.entity';
import { ConlessMaster } from 'src/entities/pays/conless_master.entity';
import { ConlessUnion } from 'src/entities/pays/conless_union.entity';
import { ConlessVisa } from 'src/entities/pays/conless_visa.entity';
import { GoogleMaestro } from 'src/entities/pays/google_maestreo.entity';
import { GoogleMaster } from 'src/entities/pays/google_master.entity';
import { GoogleVisa } from 'src/entities/pays/google_visa.entity';
import { Kakaopay } from 'src/entities/pays/kakaopay.entity';
import { Naverpay } from 'src/entities/pays/naverpay.entity';
import { Payco } from 'src/entities/pays/pacyco.entity';
import { Toss } from 'src/entities/pays/toss.entity';
import { Zeropay } from 'src/entities/pays/zeropay.entity';
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
    @Inject('APPLE_JCB_REPOSITORY')
    private apple_jcbRepository: Repository<AppleJcb>,
    @Inject('KAKAOPAY_REPOSITORY')
    private kakaopayRepository: Repository<Kakaopay>,
    @Inject('NAVERPAY_REPOSITORY')
    private naverpayRepository: Repository<Naverpay>,
    @Inject('PAYCO_REPOSITORY')
    private paycoRepository: Repository<Payco>,
    @Inject('ZEROPAY_REPOSITORY')
    private zeropayRepository: Repository<Zeropay>,
    @Inject('CONLESS_VISA_REPOSITORY')
    private conless_visaRepository: Repository<ConlessVisa>,
    @Inject('CONLESS_MASTER_REPOSITORY')
    private conless_masterRepository: Repository<ConlessMaster>,
    @Inject('CONLESS_AMEX_REPOSITORY')
    private conless_amexRepository: Repository<ConlessAmex>,
    @Inject('CONLESS_UNION_REPOSITORY')
    private conless_unionRepository: Repository<ConlessUnion>,
    @Inject('CONLESS_JCB_REPOSITORY')
    private conless_jcbRepository: Repository<ConlessJcb>,
    @Inject('GOOGLE_VISA_REPOSITORY')
    private google_visaRepository: Repository<GoogleVisa>,
    @Inject('GOOGLE_MASTER_REPOSITORY')
    private google_masterRepository: Repository<GoogleMaster>,
    @Inject('GOOGLE_MAESTRO_REPOSITORY')
    private google_maestroRepository: Repository<GoogleMaestro>,
    @Inject('TOSS_REPOSITORY')
    private tossRepository: Repository<Toss>,
    @Inject('PAY_REPOSITORY')
    private payRepository: Repository<Pay>,
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

    try {
      await eval('this.' + pay + 'Repository').save(create);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return false;
        // throw new HttpException(
        //   ` ${pay} - store id : ${store_id} is existed`,
        //   409,
        // );
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }

    return true;
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
      .createQueryBuilder()
      .select(`num`)
      .where(`store_id = ${store_id}  limit 1`)
      .getRawOne();
  }

  //피드백
  async feedBack(store_id, feedback): Promise<any> {
    const { pay, feed } = feedback;
    const repo = this.repo(pay);

    const result = await this.successOrFail(repo, store_id, pay, feed);

    return result;
  }

  // update에 동적으로 할당 못해서 만든 함수
  async successOrFail(repo, store_id, pay, feed) {
    if (feed === true) {
      return await repo
        .createQueryBuilder(pay)
        .update()
        .set({
          success: () => `success +1`,
          last_state: 'success',
          last_time: () => `left(NOW(),19)`,
        })
        .where(`store_id = ${store_id}`)
        .execute();
    } else {
      return await repo
        .createQueryBuilder(pay)
        .update()
        .set({
          fail: () => `fail +1`,
          last_state: 'fail',
          last_time: () => `left(NOW(),19)`,
        })
        .where(`store_id = ${store_id}`)
        .execute();
    }
  }

  //dev

  async deletePay(id, pay) {
    const repo = this.repo(pay);
    return await repo.delete({
      user_id: id,
    });
  }

  async payCheck2(store_id, pay) {
    // const repo = this.repo(pay);
    return await this.payRepository
      .createQueryBuilder()
      // .select(
      //   `EXISTS (SELECT * FROM pay where store_id = '${store_id}' and pay = '${pay}') as isChk`,
      // )
      .select('num')
      .where(`store_id = '${store_id}' and pay = '${pay}' limit 1`)
      .getRawOne();
  }

  async feedBack2(store_id, feedback): Promise<any> {
    const { pay, feed } = feedback;
    let result;
    if (feed === true) {
      return await this.payRepository
        .createQueryBuilder()
        .update()
        .set({
          success: () => `success +1`,
          last_state: 'success',
          last_time: () => `left(NOW(),19)`,
        })
        .where(`store_id = '${store_id}' and pay = '${pay}'`)
        .execute();
    } else {
      return await this.payRepository
        .createQueryBuilder()
        .update()
        .set({
          fail: () => `fail +1`,
          last_state: 'fail',
          last_time: () => `left(NOW(),19)`,
        })
        .where(`store_id = '${store_id}'  and pay = '${pay}'`)
        .execute();
    }
  }

  async createPay2(createPayDto: CreatePayDto): Promise<boolean> {
    const { store_id, pay } = createPayDto;
    const repo = this.repo(pay);

    try {
      await this.payRepository
        .createQueryBuilder()
        .insert()
        .values({ store_id, pay })
        .execute();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return false;
        // throw new HttpException(
        //   ` ${pay} - store id : ${store_id} is existed`,
        //   409,
        // );
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }
  }

  async getPay2(store_id, pay) {
    const repo = this.repo(pay);
    return await this.payRepository
      .createQueryBuilder()
      .select('*')
      .where(`store_id = '${store_id}' and pay = '${pay}'`)
      .getRawOne();
  }

  async payCheck3(store_id, pays) {
    let where = '';
    for (let i = 0; i < pays.length; i++) {
      if (i === 0) where += `pay = '${pays[i]}'`;
      else where += ` or pay = '${pays[i]}'`;
    }

    return await this.payRepository
      .createQueryBuilder()
      .select('pay')
      .where(`store_id = '${store_id}' and (${where})`)
      .getRawMany();
  }

  async getPay3(store_id, pays) {
    let where = '';
    for (let i = 0; i < pays.length; i++) {
      if (i === 0) where += `pay = '${pays[i]}'`;
      else where += ` or pay = '${pays[i]}'`;
    }

    return await this.payRepository
      .createQueryBuilder()
      .select('*')
      .where(`store_id = '${store_id}' and (${where})`)
      .getRawMany();
  }
}
