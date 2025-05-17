import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { traceStorage } from '../logger/trace-context';

const getFormattedDate = (): string => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body: requestBody } = req;
    const start = Date.now();
    const oldSend = res.send;

    // 응답 본문 가로채기
    res.send = function (this: Response, body: any): Response {
      const status = res.statusCode;
      const duration = Date.now() - start;
      const now = getFormattedDate();
      const trace = traceStorage.getStore();
      const traceId = trace?.traceId ?? 'NO_TRACE';
      const ip = trace?.ip ?? req.ip;
      const ip_address = ip === '::1' ? 'localhost' : ip;

      const _prettyBody = typeof requestBody === 'object' ? JSON.stringify(requestBody) : requestBody;
      const _prettyResponse = typeof body === 'object' ? JSON.stringify(body) : body;
      const prettyBody = _prettyBody ?? 'NO_BODY';
      const prettyResponse = _prettyResponse ?? 'NO_RESPONSE';

      console.log(
        `[${traceId}][${ip_address}][${now}][status: ${status}] ${method} ${originalUrl} Body: ${prettyBody} Response: ${prettyResponse} Duration: ${duration}ms` 
      );

      return oldSend.call(this, body);
    };

    next();
  }
}