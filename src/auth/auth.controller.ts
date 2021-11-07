import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  /**
   * 회원가입
   * @param authCredentialDto
   */
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  /**
   * 로그인
   * @param authCredentialDto
   */
  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.authService.signIn((authCredentialDto));
  }

  /**
   * jwt 인증 확인
   * 커스텀 데코레이터 생성 후 확인 :  @GetUser()
   * @param user
   */
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('==========================================');
    console.log('user', user);
    console.log('==========================================');
  }
}
