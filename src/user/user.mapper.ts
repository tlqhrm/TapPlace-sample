import { HttpException, Inject } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export class UserMapper {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const { user_id, os, birth, pays } = createUserDto;

    const user = this.userRepository.create({
      user_id,
      os,
      birth,
      pays,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`user_id : ${user_id} is existed`, 409);
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
      .where(`user_id = ${user_id}`)
      .execute();

    try {
      await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({ pays })
        .where(`user_id = ${user_id}`)
        .execute();
    } catch (error) {
      if (!result.affected) {
        throw new HttpException(`user_id : ${user_id} is not exist`, 409);
      } else {
        throw new HttpException(`Unkown error please contact the manager`, 500);
      }
    }

    return true;
  }
}
