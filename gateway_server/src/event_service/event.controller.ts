import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result, ApiError } from '../common/api_result';
import { EventService } from './event.service';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { User as UserDecorator } from '../common/auth/user.decorator';
@Controller('/events')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('')
  @Roles(Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  async getEventList(@Query() query: any) {
    try {
      const result = await this.eventService.getEventList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in getEventList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/detail/:event_id')
  @Roles(Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  async getEventDetail(@Param('event_id') eventId: string) {
    try {
      const result = await this.eventService.getEventDetail(eventId);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in getEventDetail:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/history')
  @Roles(Role.USER)
  async getHistoryList(@UserDecorator() user: any, @Query() query: any) {
    try {
      const result = await this.eventService.getHistoryList(user, query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in getHistoryList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/reward-receive')
  @Roles(Role.USER)
  async createRewardReceipt(@UserDecorator() user: any, @Body() data: any) {
    try {
      const result = await this.eventService.createRewardReceipt(user, data);
      return make_api_result(ApiResult.IS_OK, result);  
    } catch (error) {
      if (error instanceof ApiError) {
        return make_api_result(error);
      }
      console.error('Error in createRewardReceipt:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}