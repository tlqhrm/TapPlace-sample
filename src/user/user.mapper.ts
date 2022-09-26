import { HttpException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserMapper {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const {
      user_id,
      os,
      birth,
      sex,
      pays,
      marketing_agree,
      personal_date,
      service_date,
      token,
    } = createUserDto;

    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values({
          user_id,
          os,
          birth,
          sex,
          pays,
          marketing_date: () => `left(NOW(),19)`,
          marketing_agree,
          personal_date,
          service_date,
          token,
        })
        .execute();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log('--------------------------');
        return false;
      } else {
        if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
        throw new HttpException(`알 수 없는 오류`, 500);
      }
    }

    return true;
  }

  // async updateUserPays(userDto) {
  //   const { user_id, pays } = userDto;
  //   const result = await this.userRepository
  //     .createQueryBuilder('user')
  //     .update()
  //     .set({ pays })
  //     .where('user_id = :user_id', { user_id: user_id })
  //     .execute();

  //   return true;
  // }

  async updateUser(updateUserDto) {
    const { user_id } = updateUserDto;
    const set = {};
    for (const element in updateUserDto) {
      if (element === 'user_id') continue;
      if (element === 'key') continue;
      if (updateUserDto[element] != null) set[element] = updateUserDto[element];
    }
    let result;
    try {
      result = await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set(set)
        .where('user_id = :user_id', { user_id: user_id })
        .execute();
    } catch (error) {
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`알 수 없는 오류`, 500);
    }

    if (!result['affected']) throw new HttpException('존재하지 않는 유저', 404);
    return result;
  }

  async updateMarketing(updateMarketingDto) {
    const { user_id, marketing_agree } = updateMarketingDto;
    let result;
    try {
      result = await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({
          marketing_date: () => `left(NOW(),19)`,
          marketing_agree: marketing_agree,
        })
        .where('user_id = :user_id', { user_id: user_id })
        .execute();
    } catch (error) {
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`알 수 없는 오류`, 500);
    }
    if (!result['affected']) throw new HttpException('존재하지 않는 유저', 404);
    return true;
  }

  async dropUser(user_id) {
    let result;

    try {
      result = await this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          user_id: `deleted_${randomUUID()}`,
          birth: '',
          sex: '',
        })
        .where('user_id = :user_id', { user_id: user_id })
        .execute();
    } catch (error) {
      if (error.sqlMessage) throw new HttpException(error.sqlMessage, 400);
      throw new HttpException(`알 수 없는 오류`, 500);
    }
    if (!result['affected'])
      throw new HttpException('존재하지 않는 유저.', 404);
    return true;
  }
  //dev
  async getAllUser() {
    return await this.userRepository.findBy({});
  }

  async getUser(id: string) {
    return await this.userRepository.findOneBy({
      user_id: id,
    });
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete({
      user_id: id,
    });
  }

  async getCountById(user_id: string) {
    return await this.userRepository
      .createQueryBuilder()
      .select('count(*) as count')
      .where(`user_id = '${user_id}'`)
      .getRawOne();
  }

  async getMaketingUser() {
    return await this.userRepository
      .createQueryBuilder()
      .select('token')
      .where(`marketing_agree = true`)
      .getRawMany();
  }
}
