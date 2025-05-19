import { Controller, Post, Body, UseGuards, Req, Res, Get, Put } from '@nestjs/common';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { ApiError } from '../common/api_result';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { User as UserDecorator } from '../common/auth/user.decorator';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.login(data, req, res);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
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
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in signup:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/logout')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      await this.userService.logout(req, res);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in logout:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Put('/role-change')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async roleChange(@Body() data: any) {
    try {
      await this.userService.roleChange(data);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in roleChange:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  } 

  @Get('/user-info')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async userInfo(@UserDecorator() user: any) {    
    try {
      const result = await this.userService.userInfo(user);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in userInfo:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/invite-friend')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async inviteFriend(@UserDecorator() user: any) {
    try {
      await this.userService.inviteFriend(user);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in inviteFriend:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/kill-monster')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async killMonster(@UserDecorator() user: any) {
    try {
      await this.userService.killMonster(user);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in killMonster:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/login-count-up')
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async loginCountUp(@UserDecorator() user: any) {
    try {
      await this.userService.loginCountUp(user);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in loginCountUp:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}