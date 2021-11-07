import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        // 1시간 유지
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],

  // JwtStrategy auth 모듈에서 하기 위해 등록
  providers: [AuthService, JwtStrategy],

  // JwtStrategy, PassportModule 다른 모듈에서도 하기 위해 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
