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
