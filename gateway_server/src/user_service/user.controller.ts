import { Controller, Get, UseGuards, Body, Post, Res } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';
import { LoginUserDto } from './user.dto';
import { Response } from 'express';
import { ApiError } from '../common/api_result';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      await this.userService.login(loginUserDto, res);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in login:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUser() {
    try {
      const result = await this.userService.getUser();
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in getUser:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}