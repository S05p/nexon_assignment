import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResult } from '../result/api-result';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const exceptionResponse = exception.getResponse() as any;

        const errorResponse = {
            ...ApiResult.VALIDATION_ERROR,
            data: {
                details: exceptionResponse.message
            }
        };

        response
            .status(400)
            .json(errorResponse);
    }
} 