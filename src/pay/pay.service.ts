import { Injectable, HttpException } from '@nestjs/common';
import { BookmarkMapper } from 'src/bookmark/bookmark.mapper';
import { Bookmark } from 'src/entities/bookmark.entity';
import { FeedbackMapper } from 'src/feedback/feedback.mapper';
import { FeedbackCountService } from 'src/feedback_count/feedback_count.service';
import { StoreMapper } from 'src/store/store.mapper';
import { CreatePayDto } from './dto/create-pay.dto';
import { FeedbackDto } from './dto/feedbackdto';
import { GetPaysCehckDto } from './dto/get-pays-check.dto';
import { GetPaysMoreDto } from './dto/get-pays-more.dto';
import { GetPaysDto } from './dto/get-pays.dto';
import { PayMapper } from './pay.mapper';

@Injectable()
export class PayService {
  constructor(
    private payMapper: PayMapper,
    private storeMapper: StoreMapper,
    private readonly fbcService: FeedbackCountService,
    private feedbackMapper: FeedbackMapper,
    private bookmarkMapper: BookmarkMapper,
  ) {}

  //store_id에 에 맞는 존재하는 pay들 exist까지 담아서 전달
  async getPays(getPaysDto: GetPaysDto | GetPaysCehckDto, check: boolean) {
    const { store_id, pays, user_id } = getPaysDto;
    let result = {};
    if (!check) {
      result = await this.storeMapper.getStoreById(store_id);
      if (!result) throw new HttpException('존재하지 않는 store_id', 400);
    }
    result['feedback'] = [];
    result = await this.getPaysFeedback(store_id, pays, result);
    const isBookmark = await this.bookmarkMapper.checkBookmark(
      user_id,
      store_id,
    );
    isBookmark['count'] === '0'
      ? (result['isBookmark'] = false)
      : (result['isBookmark'] = true);
    return result;
  }

  async getPaysMore(GetPaysMoreDto: GetPaysMoreDto | GetPaysCehckDto) {
    const { store_id, pays } = GetPaysMoreDto;

    const result = {
      feedback: [],
    };

    return await this.getPaysFeedback(store_id, pays, result);
  }

  // store_id로 조회후 없으면 가게 등록
  async getPaysCheck(getPaysCehckDto: GetPaysCehckDto) {
    const { store_id, pays } = getPaysCehckDto;
    const result = {
      feedback: [],
    };
    const found = await this.storeMapper.getStoreById(store_id);
    if (found) {
      return await this.getPays(getPaysCehckDto, true);
    } else {
      await this.storeMapper.createStore(getPaysCehckDto);
      for await (const what_pay of pays) {
        result['feedback'].push({
          exist: false,
          pay: what_pay,
        });
      }
      return await result;
    }
  }

  //) (구)피드백
  // async feedBack(feedbackDto: FeedbackDto): Promise<any> {
  //   const { store_id, user_feedback, user_id } = feedbackDto;
  //   const result = {
  //     feedback_result: [],
  //     remain_count: 0,
  //   };
  //   result['remain_count'] = await this.fbcService.increseCount(user_id);

  //   for (const feedback of user_feedback) {
  //     const { pay, exist } = feedback;
  //     let affected;
  //     if (exist === true) {
  //       affected = await this.payMapper.feedBack(store_id, feedback);
  //     } else {
  //       const createPayDto = new CreatePayDto();
  //       createPayDto.store_id = store_id;
  //       createPayDto.pay = pay;
  //       // 없으면 만들고 피드백
  //       await this.payMapper.createPay(createPayDto);

  //       affected = await this.payMapper.feedBack(store_id, feedback);
  //     }

  //     if (affected['affected']) {
  //       const { success, fail, last_state } = await this.payMapper.getPay(
  //         store_id,
  //         pay,
  //       );
  //       result['feedback_result'].push({
  //         pay: pay,
  //         success: success,
  //         fail: fail,
  //         last_state: last_state,
  //       });
  //     }
  //   }
  //   return result;
  // }

  //dev

  async createPay(createPayDto: CreatePayDto): Promise<boolean> {
    return await this.payMapper.createPay(createPayDto);
  }

  // async getPaysById(store_id) {
  //   const pays = [
  //     'kakaopay',
  //     'naverpay',
  //     'payco',
  //     'zeropay',
  //     'apple_visa',
  //     'apple_master',
  //     'apple_jcb',
  //     'conless_visa',
  //     'conless_master',
  //     'conless_amex',
  //     'conless_union',
  //     'conless_jcb',
  //     'google_visa',
  //     'google_master',
  //     'google_maestro',
  //     'toss',
  //   ];
  //   const result = [];

  //   for await (const what_pay of pays) {
  //     const pay = await this.payMapper.getPay(store_id, what_pay);
  //     if (pay) {
  //       pay['pay'] = what_pay;
  //       pay['exist'] = true;
  //       result.push(pay);
  //     } else {
  //       result.push({
  //         exist: false,
  //         pay: what_pay,
  //       });
  //     }
  //   }
  //   return result;
  // }

  // async deletePay(id, pay) {
  //   return await this.payMapper.deletePay(id, pay);
  // }

  // (구)getPays 중복기능 함수화
  // async getPaysFeedback(store_id, pays, result) {
  //   for await (const what_pay of pays) {
  //     const pay = await this.payMapper.getPay(store_id, what_pay);
  //     if (pay) {
  //       pay['pay'] = what_pay;
  //       pay['exist'] = true;
  //       result['feedback'].push(pay);
  //     } else {
  //       result['feedback'].push({
  //         exist: false,
  //         pay: what_pay,
  //       });
  //     }
  //   }
  //   return result;
  // }
  async getPaysFeedback(store_id, pays, result) {
    const payCheck = await this.payMapper.getPay3(store_id, pays);
    // console.log(payCheck);
    const temp = [];
    for (const pay of payCheck) {
      pay['exist'] = true;
      result['feedback'].push(pay);
      temp.push(pay['pay']);
    }
    const diff = pays.filter((x) => !temp.includes(x));
    // console.log(pays, diff, temp);
    for (const pay of diff) {
      result['feedback'].push({
        exist: false,
        pay: pay,
      });
    }
    return result;
  }

  async feedBack(feedbackDto: FeedbackDto): Promise<any> {
    const { store_id, user_feedback, user_id } = feedbackDto;
    const result = {
      feedback_result: [],
      remain_count: 0,
    };
    result['remain_count'] = await this.fbcService.increseCount(user_id);

    for (const feedback of user_feedback) {
      const { pay, exist } = feedback;
      if (!exist) {
        const check = await this.payMapper.payCheck2(store_id, pay);
        // console.log(`==========${JSON.stringify(check)}===========`);
        if (!check) {
          const createPayDto = new CreatePayDto();
          createPayDto.store_id = store_id;
          createPayDto.pay = pay;
          // 없으면 만들고 피드백
          await this.payMapper.createPay2(createPayDto);
        }
      }
      const affected = await this.payMapper.feedBack2(store_id, feedback);
      // console.log(`----------${affected['affected']}----------`);
      if (affected['affected']) {
        const { success, fail, last_state } = await this.payMapper.getPay2(
          store_id,
          pay,
        );
        result['feedback_result'].push({
          pay: pay,
          success: success,
          fail: fail,
          last_state: last_state,
        });
      }
      console.log(user_feedback);
    }

    await this.feedbackMapper.createFeedback(user_id, store_id, user_feedback);
    return true;
  }
}
