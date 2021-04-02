import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository,
              private _jwtService: JwtService) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this._userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this._userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {username};
    const accessToken = this._jwtService.sign(payload);

    return {accessToken};
  }
}
