import { Controller, UseGuards, Body, Post, Res, Put, Req } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { UserService } from './user.service';
import { LoginUserDto, SignupUserDto, RoleChangeDto } from './user.dto';
import { Response, Request } from 'express';
import { ApiError } from '../common/api_result';
import { User as UserDecorator } from '../common/auth/user.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.login(loginUserDto, req,res);
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
  async signup(@Body() signupUserDto: SignupUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.signup(signupUserDto, req, res);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in signup:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Put('/role_change')
  @Roles(Role.ADMIN)
  @UseGuards(CustomJwtAuthGuard, RolesGuard)
  async roleChange(@Body() roleChangeDto: RoleChangeDto): Promise<any> {
    try {
      await this.userService.roleChange(roleChangeDto); 
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in roleChange:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/logout')
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

  @Post('/invite_friend')
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

  @Post('/kill_monster')
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
  
  @Post('/login_count_up')
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