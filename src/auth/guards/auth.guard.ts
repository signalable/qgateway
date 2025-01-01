import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('인증 토큰이 없습니다');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('잘못된 인증 형식입니다');
    }

    const isValid = await this.authService.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다');
    }

    return true;
  }
}
