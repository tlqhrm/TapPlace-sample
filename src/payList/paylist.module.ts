import { Module } from '@nestjs/common';
import { PaylistService } from './paylist.service';
import { PaylistController } from './paylist.controller';

@Module({
  controllers: [PaylistController],
  providers: [PaylistService]
})
export class PaylistModule {}
