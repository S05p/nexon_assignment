import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiError, ApiResult, make_api_result } from '../api_result';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof ApiError) {
      response.status(200).json(make_api_result(exception));
    } else {
      console.error('Unexpected error:', exception);
      response.status(500).json(make_api_result(ApiResult.UNKNOWN_ERROR));
    }
  }
} 