import { HttpException, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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
        console.log(error);
        throw new HttpException(`Unkown error please contact the manager`, 500);
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

  async updateUser(updateUserDto, user_id) {
    const set = {};
    for (const element in updateUserDto) {
      if (element === 'user_id') continue;
      if (element === 'key') continue;
      if (updateUserDto[element] != null) set[element] = updateUserDto[element];
    }

    const result = await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set(set)
      .where('user_id = :user_id', { user_id: user_id })
      .execute();

    return true;
  }

  async updateMarketing(updateMarketingDto) {
    const { user_id, marketing_agree } = updateMarketingDto;
    const result = await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({
        marketing_date: () => `left(NOW(),19)`,
        marketing_agree: marketing_agree,
      })
      .where('user_id = :user_id', { user_id: user_id })
      .execute();

    return true;
  }

  async dropUser(user_id) {
    const result = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        user_id: `deleted_${randomUUID()}`,
        birth: '',
        sex: '',
      })
      .where('user_id = :user_id', { user_id: user_id })
      .execute();
    console.log(result);
    if (!result['affected'])
      throw new HttpException('해당 아이디가 존재하지 않습니다.', 400);
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
}
