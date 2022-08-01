import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { userRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
