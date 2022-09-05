import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/store/store.mapper';
import { CreatePayDto } from './dto/create-pay.dto';
import { FeedbackDto } from './dto/feedbackdto';
import { GetPaysCehckDto } from './dto/get-pays-check.dto';
import { GetPaysDto } from './dto/get-pays.dto';
import { PayMapper } from './pay.mapper';

@Injectable()
export class PayService {
  constructor(private payMapper: PayMapper, private storeMapper: StoreMapper) {}

  //store_id에 에 맞는 존재하는 pay들 exist까지 담아서 전달
  async getPays(getPaysDto: GetPaysDto | GetPaysCehckDto, check: boolean) {
    const { store_id, pays } = getPaysDto;
    let result = {};
    if (!check) {
      result = await this.storeMapper.getStoreById(store_id);
      result['feedback'] = [];
    } else {
      result['feedback'] = [];
    }

    for await (const what_pay of pays) {
      const pay = await this.payMapper.getPay(store_id, what_pay);
      if (pay) {
        pay['pay'] = what_pay;
        pay['exist'] = true;
        result['feedback'].push(pay);
      } else {
        result['feedback'].push({
          exist: false,
          pay: what_pay,
        });
      }
    }
    return result;
  }

  async getPaysMore(getPaysDto: GetPaysDto | GetPaysCehckDto) {
    const { store_id, pays } = getPaysDto;

    const result = [];

    for await (const what_pay of pays) {
      const pay = await this.payMapper.getPay(store_id, what_pay);
      if (pay) {
        pay['pay'] = what_pay;
        pay['exist'] = true;
        result.push(pay);
      } else {
        result.push({
          exist: false,
          pay: what_pay,
        });
      }
    }
    return result;
  }

  // store_id로 조회후 없으면 가게 등록
  async getPaysCheck(getPaysCehckDto: GetPaysCehckDto) {
    const { store_id, pays } = getPaysCehckDto;
    const result = [];
    const found = await this.storeMapper.getStoreById(store_id);
    if (found) {
      return await this.getPays(getPaysCehckDto, true);
    } else {
      await this.storeMapper.createStore(getPaysCehckDto);
      for await (const what_pay of pays) {
        result.push({
          exist: false,
          pay: what_pay,
        });
      }
      return await result;
    }
  }

  //피드백
  async feedBack(feedbackDto: FeedbackDto): Promise<any[]> {
    const { store_id, feedbacks } = feedbackDto;
    const result = [];

    for (const feedback of feedbacks) {
      const { pay, exist } = feedback;
      let affected;
      if (exist === true) {
        affected = await this.payMapper.feedBack(store_id, feedback);
      } else {
        const createPayDto = new CreatePayDto();
        createPayDto.store_id = store_id;
        createPayDto.pay = pay;
        // 없으면 만들고 피드백
        await this.payMapper.createPay(createPayDto);

        affected = await this.payMapper.feedBack(store_id, feedback);
      }

      if (affected['affected']) {
        const { success, fail, last_state } = await this.payMapper.getPay(
          store_id,
          pay,
        );
        result.push({
          pay: pay,
          success: success,
          fail: fail,
          last_state: last_state,
        });
      }
    }
    return result;

    //   //exist 로 있는지 없는지 판단
    //   const { exist } = feedbackDto;
    //   if (exist === true) {
    //     return await this.payMapper.feedBack(feedbackDto);
    //   } else {
    //     const { store_id, pay } = feedbackDto;
    //     const createPayDto = new CreatePayDto();
    //     createPayDto.store_id = store_id;
    //     createPayDto.pay = pay;
    //     // 없으면 만들고 피드백
    //     await this.payMapper.createPay(createPayDto);
    //     return await this.payMapper.feedBack(feedbackDto);
    //   }
  }

  //dev

  async createPay(createPayDto: CreatePayDto): Promise<boolean> {
    return await this.payMapper.createPay(createPayDto);
  }

  async getPaysById(store_id) {
    const pays = [
      'kakaopay',
      'naverpay',
      'payco',
      'zeropay',
      'apple_visa',
      'apple_master',
      'apple_jcb',
      'conless_visa',
      'conless_master',
      'conless_amex',
      'conless_union',
      'conless_jcb',
      'google_visa',
      'google_master',
      'google_maestro',
    ];
    const result = [];

    for await (const what_pay of pays) {
      const pay = await this.payMapper.getPay(store_id, what_pay);
      if (pay) {
        pay['pay'] = what_pay;
        pay['exist'] = true;
        result.push(pay);
      } else {
        result.push({
          exist: false,
          pay: what_pay,
        });
      }
    }
    return result;
  }

  async deletePay(id, pay) {
    return await this.payMapper.deletePay(id, pay);
  }
}
