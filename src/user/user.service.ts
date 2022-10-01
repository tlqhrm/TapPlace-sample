import { Injectable, HttpException, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private userMapper: UserMapper) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const result = await this.userMapper.createUser(createUserDto);
    if (!result) {
      const updateResult = await this.userMapper.updateUser(createUserDto);
    }
    return true;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const updateResult = await this.userMapper.updateUser(updateUserDto);
    return true;
  }

  async dropUser(user_id) {
    return await this.userMapper.dropUser(user_id);
  }

  async updateMarketing(updateMarketingDto) {
    return await this.userMapper.updateMarketing(updateMarketingDto);
  }

  async getMarketingUser() {
    const result = {
      token: [],
    };
    const marketingUser = await this.userMapper.getMaketingUser();
    result['token'] = marketingUser.map((val) => val['token']);
    return result;
  }
  // //dev
  // async getAllUser() {
  //   return await this.userMapper.getAllUser();
  // }

  async getUser(id: string) {
    return await this.userMapper.getUser(id);
  }

  // async deleteUser(id: string) {
  //   return await this.userMapper.deleteUser(id);
  // }
}
