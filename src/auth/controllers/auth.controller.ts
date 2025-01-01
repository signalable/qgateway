import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, LoginResponseDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') auth: string): Promise<void> {
    const token = auth?.split(' ')[1];
    if (!token) {
      return;
    }
    await this.authService.logout(token);
  }
}
