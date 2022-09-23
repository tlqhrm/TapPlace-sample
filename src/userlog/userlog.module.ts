import { Module } from '@nestjs/common';
import { UserlogService } from './userlog.service';
import { UserlogController } from './userlog.controller';
import { userLogRepository } from 'src/repositories/userlog.repository';
import { UserLogMapper } from './userlog.mapper';
import { DatabaseModule } from 'src/database/database.module';
import { termsRepository } from 'src/repositories/terms.repository';
import { TermsMapper } from 'src/terms/terms.mapper';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';
import { TermsModule } from 'src/terms/terms.module';

@Module({
  imports: [DatabaseModule, UserModule, AdminModule, TermsModule],
  controllers: [UserlogController],
  providers: [UserlogService, ...userLogRepository, UserLogMapper],
})
export class UserlogModule {}
