import { Module } from '@nestjs/common';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { termsRepository } from 'src/repositories/terms.repository';
import { TermsMapper } from './terms.mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [TermsController],
  providers: [TermsService, ...termsRepository, TermsMapper],
  exports: [...termsRepository, TermsMapper],
})
export class TermsModule {}
