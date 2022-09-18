import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private userMapper: UserMapper) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const result = await this.userMapper.createUser(createUserDto);
    if (!result) {
      const { user_id } = createUserDto;
      await this.userMapper.updateUser(createUserDto, user_id);
    }
    return true;
  }

  async updateUser(updateUserDto: UpdateUserDto, user_id) {
    return await this.userMapper.updateUser(updateUserDto, user_id);
  }

  async dropUser(user_id) {
    return await this.userMapper.dropUser(user_id);
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
