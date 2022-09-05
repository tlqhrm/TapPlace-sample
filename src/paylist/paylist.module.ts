import { Module } from '@nestjs/common';
import { PaylistService } from './paylist.service';
import { PaylistController } from './paylist.controller';
import { paylistRepository } from 'src/repositories/paylist.repository';
import { PayListMapper } from './paylist.mapper';
import { DatabaseModule } from 'src/database/database.module';
import { TermsMapper } from 'src/terms/terms.mapper';
import { TermsModule } from 'src/terms/terms.module';

@Module({
  imports: [DatabaseModule, TermsModule],
  controllers: [PaylistController],
  providers: [PaylistService, ...paylistRepository, PayListMapper],
})
export class PaylistModule {}
