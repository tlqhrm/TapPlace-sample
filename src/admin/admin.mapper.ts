import {
  ConflictException,
  HttpException,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AdminLoginDto } from './dto/admin-login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';

export class AdminMapper {
  constructor(
    @Inject('ADMIN_REPOSITORY') private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async signUp(createAdminDto: CreateAdminDto) {
    const { admin_id, password, role } = createAdminDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // const user = await this.adminRepository.create({
    //   admin_id,
    //   password: hashedPassword,
    //   role,
    //   regist_date: () => `left(NOW(),19)`,
    // });

    try {
      await this.adminRepository
        .createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          admin_id,
          password: hashedPassword,
          role,
          regist_date: () => `left(NOW(),19)`,
        })
        .execute();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing admin_id');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return true;
  }

  async logIn(adminLoginDto: AdminLoginDto): Promise<{ accessToken: string }> {
    const { admin_id, password } = adminLoginDto;
    const user = await this.adminRepository.findOneBy({ admin_id: admin_id });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { admin_id, role: user['role'] };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
