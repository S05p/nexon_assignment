import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResult } from '../result/api-result';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (exception instanceof BadRequestException) {
        const exceptionResponse = exception.getResponse() as any;
  
        const errorResponse = {
          ...ApiResult.VALIDATION_ERROR,
          data: {
            details: exceptionResponse.message,
          },
        };
  
        return response.status(200).json(errorResponse);
      }
  
      // 다른 예외들도 처리할 수 있도록 fallback
      return response.status(500).json(exception);
    }
  }