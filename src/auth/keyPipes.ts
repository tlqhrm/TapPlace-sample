import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';

export class keyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.keyCheck(value)) {
      throw new HttpException('Unable to access.', 403);
    }
  }

  private keyCheck(key: string) {
    return process.env.KEY === key;
  }
}

export class keyPipe2 implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.keyCheck2(value)) {
      throw new HttpException('Unable to access.', 403);
    }
  }

  private keyCheck2(key) {
    return process.env.KEY === key[0] && process.env.KEY2 === key[1];
  }
}
