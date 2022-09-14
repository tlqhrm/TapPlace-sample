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
    const { user_id, os, birth, sex, pays } = createUserDto;

    const user = this.userRepository.create({
      user_id,
      os,
      birth,
      sex,
      pays,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return false;
        // throw new HttpException(`user_id : ${user_id} is existed`, 409);
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }

    return true;
  }

  async updateUserPays(userDto) {
    const { user_id, pays } = userDto;
    const result = await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ pays })
      .where('user_id = :user_id', { user_id: user_id })
      .execute();

    return true;
  }

  async updateUser(updateUserDto) {
    const { user_id } = updateUserDto;
    const set = {};
    for (const element in updateUserDto) {
      if (element === 'user_id') continue;
      if (element === 'key') continue;
      // console.log(updateUserDto[element]);
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
}
