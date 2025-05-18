import { Controller, Put, Body, Post, Get } from '@nestjs/common';
import { ApiResult, make_api_result, ApiError } from '../common/api_result';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, RoleChangeDto, InviteFriendDto } from './user.dto';

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
    const result = await this.userService.login(loginUserDto);
    return make_api_result(ApiResult.IS_OK, result);
  }

  @Put('/role_change')
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

  @Post('/invite_friend')
  async inviteFriend(@Body() inviteFriendDto: InviteFriendDto) {
    try {
      this.userService.inviteFriend(inviteFriendDto);
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in inviteFriend:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}