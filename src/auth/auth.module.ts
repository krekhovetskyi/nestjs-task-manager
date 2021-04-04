import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { get } from 'config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || get<string>('jwt.secret'),
      signOptions: {expiresIn: get<string>('jwt.expiresIn')}
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {
}
