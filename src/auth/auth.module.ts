import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
  providers: [AuthService]
})
export class AuthModule {}
