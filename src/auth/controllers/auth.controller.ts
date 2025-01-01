import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, LoginResponseDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입은 더 엄격한 제한 적용
  @Throttle({ default: { limit: 3, ttl: 1000 } }) // 1분당 3회로 제한
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    await this.authService.register(registerDto);
  }

  // 로그인은 기본 제한 적용
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') auth: string): Promise<void> {
    // Authorization 헤더가 없는 경우 처리
    if (!auth) {
      throw new UnauthorizedException('Authorization 헤더가 필요합니다');
    }

    // Bearer 토큰 형식 검증 및 파싱
    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('잘못된 Authorization 형식입니다');
    }

    try {
      await this.authService.logout(token);
    } catch (error) {
      // HttpClientService에서 이미 에러를 적절히 변환하므로 그대로 throw
      throw error;
    }
  }
}
