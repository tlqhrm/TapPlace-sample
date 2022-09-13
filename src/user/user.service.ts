import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPaysDto } from './dto/updatePay-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private userMapper: UserMapper) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userMapper.createUser(createUserDto);
  }

  async updateUserPays(updateUserPaysDto: UpdateUserPaysDto) {
    return await this.userMapper.updateUserPays(updateUserPaysDto);
  }

  //dev
  async getAllUser() {
    return await this.userMapper.getAllUser();
  }

  async getUser(id: string) {
    return await this.userMapper.getUser(id);
  }

  async deleteUser(id: string) {
    return await this.userMapper.deleteUser(id);
  }
}
