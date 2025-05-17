import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/auth.dto';
import { RolesGuard } from './auth/roles.guard';
import { CustomJwtAuthGuard } from './auth/jwt.strategy';
import { ApiResult, ApiError, make_api_result } from './common/api_result';

@Controller()
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.USER)
  getHello(): Record<string, any> {
    try {
      const result = this.appService.getHello();
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getHello:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}

export const _controllers = [AppController];