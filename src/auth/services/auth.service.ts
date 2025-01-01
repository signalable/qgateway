import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../http-client/services/http-client.service';
import { RegisterDto, LoginDto, LoginResponseDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;
  private readonly userServiceUrl: string;

  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl = this.configService.get<string>('authService.url');
    this.userServiceUrl = this.configService.get<string>('userService.url');
  }

  // 회원가입
  async register(registerDto: RegisterDto): Promise<void> {
    try {
      await this.httpClient.post(
        `${this.userServiceUrl}/api/users/register`,
        registerDto,
      );
    } catch (error) {
      // 에러 처리는 http-client에서 하므로 그대로 전파
      throw error;
    }
  }

  // 로그인
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const response = await this.httpClient.post<LoginResponseDto>(
        `${this.userServiceUrl}/api/users/login`,
        loginDto,
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다');
    }
  }

  // 로그아웃
  async logout(token: string): Promise<void> {
    try {
      await this.httpClient.post(
        `${this.userServiceUrl}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  // 토큰 검증 (여전히 Auth Service 사용)
  async validateToken(token: string): Promise<boolean> {
    try {
      await this.httpClient.get(`${this.authServiceUrl}/api/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
