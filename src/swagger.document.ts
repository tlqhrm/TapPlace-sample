import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('tapplace')
      .setDescription('탭플레이스 API description')
      .setVersion('1.0.0')
      .addTag('Dev')
      .build();
  }
}
