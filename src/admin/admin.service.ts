import { Injectable } from '@nestjs/common';
import { AdminMapper } from './admin.mapper';
import { AdminLoginDto } from './dto/admin-login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private adminMapper: AdminMapper) {}
  signUp(createAdminDto: CreateAdminDto) {
    return this.adminMapper.signUp(createAdminDto);
  }

  login(adminLoginDto: AdminLoginDto) {
    return this.adminMapper.logIn(adminLoginDto);
  }

  // findAll() {
  //   return `This action returns all admin`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
