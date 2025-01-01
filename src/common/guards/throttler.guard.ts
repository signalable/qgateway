import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  // 필요한 경우 메서드 오버라이드
  protected getTracker(req: Record<string, any>): Promise<string> {
    return req.ip; // IP 기반 추적
  }
}
