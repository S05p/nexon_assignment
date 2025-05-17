import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';

@Controller('')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Get('/user')
  @Roles(Role.USER, Role.ADMIN)
  getHello(): Record<string, any> {
    try {
      const result = this.userService.getHello();
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getHello:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}