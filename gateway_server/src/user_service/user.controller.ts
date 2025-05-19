import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.login(data, req, res);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in login:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/signup')
  async signup(@Body() data: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.signup(data, req, res);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in signup:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      await this.userService.logout(req, res);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      console.error('Error in logout:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}