import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { traceStorage } from '../logger/trace-context';
import { randomUUID } from 'crypto';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = randomUUID();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    traceStorage.run({ traceId, ip: String(ip) }, () => {
      next();
    });
  }
}