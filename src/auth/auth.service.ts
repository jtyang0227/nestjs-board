import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
              private jwtService: JwtService) {
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 조건 (Secret + Payload)
      const payload = { username }; // 중요한 정보는 보관하지 않습니다.
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

}
