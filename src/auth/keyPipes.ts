import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';

export class keyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.keyCheck(value)) {
      throw new HttpException('KEY 오류.', 401);
    }
  }

  private keyCheck(key: string) {
    return process.env.KEY === key;
  }
}
