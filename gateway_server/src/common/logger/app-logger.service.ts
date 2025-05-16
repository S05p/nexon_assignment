// src/common/logger/app-logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common';
import { traceStorage } from './trace-context';
import dayjs from 'dayjs';

@Injectable()
export class AppLogger implements LoggerService {
  private getPrefix(): string {
    const trace = traceStorage.getStore();
    return trace ? `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] [${trace.traceId}] | [${trace.ip}]` : '[NO_TRACE]';
  }

  log(message: string) {
    console.log(`${this.getPrefix()} ${message}`);
  }

  error(message: string, trace?: string) {
    console.error(`${this.getPrefix()} ${message}`);
    if (trace) console.error(trace);  // stack trace 출력
  }

  warn(message: string) {
    console.warn(`${this.getPrefix()} ${message}`);
  }

  debug(message: string) {
    console.debug(`${this.getPrefix()} ${message}`);
  }

  verbose(message: string) {
    console.log(`${this.getPrefix()} ${message}`);
  }
}