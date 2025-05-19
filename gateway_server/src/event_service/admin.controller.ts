import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { EventService } from './event.service';
import { CreateEventDto, CreateRewardDto, GetRewardListQueryDto, GetAdminHistoryListQueryDto } from './event.dto';

@Controller('/admin/event')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly eventService: EventService) {}

  @Get('/history')
  @Roles(Role.ADMIN)
  async getAdminHistoryList(@Query() query: GetAdminHistoryListQueryDto) {
    try {
      const result = await this.eventService.getAdminHistoryList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getAdminHistoryList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/create-event')
  @Roles(Role.ADMIN)
  async createEvent(@Body() data: CreateEventDto) {
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
  async createReward(@Body() data: CreateRewardDto) {
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
  async getRewardList(@Query() query: GetRewardListQueryDto) {
    try {
      const result = await this.eventService.getRewardList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getRewardList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
} 