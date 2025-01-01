import { Injectable } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerException,
  ThrottlerRequest,
} from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException(
      '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    // IP와 라우트를 조합하여 트래킹
    return `${req.ip}-${req.route.path}`;
  }

  protected async handleRequest(request: ThrottlerRequest): Promise<boolean> {
    // HTTP 요청 객체 가져오기
    const req = request.context.switchToHttp().getRequest();
    const excludePaths = ['/health'];

    // 제외 경로 체크
    if (excludePaths.includes(req.path)) {
      return true;
    }

    // 상위 클래스의 handleRequest 호출
    return super.handleRequest(request);
  }
}
