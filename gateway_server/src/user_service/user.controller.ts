import { Controller, Get, UseGuards, Body, Post, Res } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';
import { LoginUserDto, SignupUserDto } from './user.dto';
import { Response } from 'express';
import { ApiError } from '../common/api_result';

@Controller('/user') // docker로 배포시 삭제
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
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

  @Post('/signup')
  async signup(@Body() signupUserDto: SignupUserDto, @Res({ passthrough: true }) res: Response) {
    try {
      await this.userService.signup(signupUserDto, res);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in signup:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}