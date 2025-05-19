import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiError, ApiResult, make_api_result } from '../api_result';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof ApiError) {
      response.status(200).json(make_api_result(exception));
    } else if (exception instanceof NotFoundException) {
      console.error('NotFoundException:', exception.message);
      response.status(404).json(make_api_result(ApiResult.NOT_FOUND));
    } else if (exception instanceof BadRequestException) {
      console.error('BadRequestException:', exception.message);
      response.status(400).json(make_api_result(ApiResult.BAD_REQUEST));
    } else {
      console.error('Unexpected error:', exception);
      response.status(500).json(make_api_result(ApiResult.UNKNOWN_ERROR));
    }
  }
}