import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: `${process.env.JWT_SECRET}`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    // const { username } = payload;
    // const user: User = await this.userRepository.findOneBy({
    //   username,
    // });
    // console.log(user);
    // if (!user) {
    //   throw new UnauthorizedException('123');
    // }
    // payload['role'] = 'admin';
    // console.log(payload);
    return payload;
  }
}
