import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { EventService } from './event.service';

@Controller('/events/admin')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly eventService: EventService) {}

  @Get('')
  @Roles(Role.ADMIN)
  async getEventList(@Query() query: any) {
    try {
      const result = await this.eventService.getAdminEventList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getEventList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/:event_id')
  @Roles(Role.ADMIN)
  async getEventDetail(@Param('event_id') eventId: string) {
    try {
      const result = await this.eventService.getAdminEventDetail(eventId);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getEventDetail:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/history')
  @Roles(Role.ADMIN)
  async getAdminHistoryList(@Query() query: any) {
    try {
      const result = await this.eventService.getAdminHistoryList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getAdminHistoryList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('')
  @Roles(Role.ADMIN)
  async createEvent(@Body() data: any) {
    try {
      const result = await this.eventService.createEvent(data);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in createEvent:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/reward')
  @Roles(Role.ADMIN)
  async createReward(@Body() data: any) {
    try {
      const result = await this.eventService.createReward(data);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in createReward:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/reward')
  @Roles(Role.ADMIN)
  async getRewardList(@Query() query: any) {
    try {
      const result = await this.eventService.getRewardList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getRewardList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
} 