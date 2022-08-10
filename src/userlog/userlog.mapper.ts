import { Inject } from '@nestjs/common';
import { UserLog } from 'src/entities/userlog.entity';
import { Repository } from 'typeorm';
import { CreateUserlogDto } from './dto/create-userlog.dto';

export class UserLogMapper {
  constructor(
    @Inject('USERLOG_REPOSITORY')
    private userLogRepository: Repository<UserLog>,
  ) {}

  async createUserLog(createUserLogDto: CreateUserlogDto): Promise<boolean> {
    const { user_id } = createUserLogDto;

    const user = await this.userLogRepository.create({
      user_id,
    });

    const result = await this.userLogRepository.save(user);

    return result ? true : false;
  }
}
