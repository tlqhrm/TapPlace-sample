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
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`${error.name}: ${error.message}`, 500);
    }
  };
}
