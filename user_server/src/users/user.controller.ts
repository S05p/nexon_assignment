import { Controller, Put, Body, Post, Get } from '@nestjs/common';
import { ApiResult, make_api_result, ApiError } from '../common/api_result';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, RoleChangeDto, UidBody } from './user.dto';

@Controller("")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.signup(createUserDto)
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in signup:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.userService.login(loginUserDto);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in login:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Put('/role-change')
  roleChange(@Body() roleChangeDto: RoleChangeDto): Record<string, any> {
    try {
      this.userService.roleChange(roleChangeDto);
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
  async userInfo(@Body() uidBody: UidBody) {
    try {
      const result = await this.userService.userInfo(uidBody);
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
  async inviteFriend(@Body() uidBody: UidBody) {
    try {
      await this.userService.inviteFriend(uidBody);
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
  async killMonster(@Body() uidBody: UidBody) {
    try {
      await this.userService.killMonster(uidBody);
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
  async loginCountUp(@Body() uidBody: UidBody) {
    try {
      await this.userService.login_count_up(uidBody);
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