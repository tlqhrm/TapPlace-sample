import { HttpException } from '@nestjs/common';

export function HandleSqlError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originMethod = descriptor.value;
  descriptor.value = async function (...args) {
    try {
      const result = await originMethod.apply(this, args);
      return result;
    } catch (error) {
      console.log(error.code);
      if (error.sqlMessage) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new HttpException('이미 등록되어 있습니다.', 409);
        }
        throw new HttpException(error.sqlMessage, 400);
      }
      throw new HttpException(`${error.name}: ${error.message}`, 500);
    }
  };
}
