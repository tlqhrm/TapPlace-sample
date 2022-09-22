import { HttpException } from '@nestjs/common';
export default async function baseException(query) {
  try {
    return await query;
  } catch (error) {
    if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
    throw new HttpException(`알 수 없는 오류`, 500);
  }
}
