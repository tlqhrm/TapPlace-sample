import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';

export class adminPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value['role'] !== 'admin') {
      throw new HttpException('운영자가 아닙니다', 403);
    }
  }
}

export class userPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value['role'] !== 'user') {
      throw new HttpException('유저가 아닙니다.', 403);
    }
  }
}
