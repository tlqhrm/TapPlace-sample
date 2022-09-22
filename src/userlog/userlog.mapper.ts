import { Inject, HttpException } from '@nestjs/common';
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

    try {
      const result = await this.userLogRepository
        .createQueryBuilder()
        .insert()
        .values({ user_id })
        .execute();
    } catch (error) {
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`알 수 없는 오류`, 500);
    }

    return true;
  }

  //dev
  async getAllUserLog() {
    return await this.userLogRepository.findBy({});
  }

  async getUserLog(id: string) {
    return await this.userLogRepository.findBy({
      user_id: id,
    });
  }

  async deleteUserLog(id: string) {
    return await this.userLogRepository.delete({
      user_id: id,
    });
  }
}
