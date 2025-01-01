import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 각 요청에 고유 ID 할당
    req['requestId'] = uuidv4();
    // 요청 시작 시간 기록
    req['startTime'] = Date.now();
    next();
  }
}
