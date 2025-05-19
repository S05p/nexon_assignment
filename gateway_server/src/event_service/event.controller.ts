import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { EventService } from './event.service';
import { User as UserDecorator } from '../common/auth/user.decorator';
import { CreateEventDto, CreateRewardDto, GetEventListQueryDto, GetEventDetailPathDto, CreateRewardReceiptDto, GetRewardListQueryDto, GetHistoryListQueryDto, GetAdminHistoryListQueryDto } from './event.dto';

@Controller('/event')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('')
  @Roles(Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  async getEventList(@Query() query: GetEventListQueryDto) {
    try {
      const result = await this.eventService.getEventList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getEventList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/detail/:event_id')
  @Roles(Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  async getEventDetail(@Param() param: GetEventDetailPathDto) {
    try {
      const result = await this.eventService.getEventDetail(param.event_id);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getEventDetail:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Get('/history')
  @Roles(Role.USER)
  async getHistoryList(@Query() query: GetHistoryListQueryDto) {
    try {
      const result = await this.eventService.getHistoryList(query);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in getHistoryList:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }

  @Post('/reward/receive')
  @Roles(Role.USER)
  async createRewardReceipt(@Body() data: CreateRewardReceiptDto) {
    try {
      const result = await this.eventService.createRewardReceipt(data);
      return make_api_result(ApiResult.IS_OK, result);
    } catch (error) {
      console.error('Error in createRewardReceipt:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}