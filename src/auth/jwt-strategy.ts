import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { get } from 'config';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || get<string>('jwt.secret')
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    const {username} = payload;

    const user = await this._userRepository.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    delete user.salt;

    return user;
  }
}
