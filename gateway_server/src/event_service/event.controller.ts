import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/auth/roles.decorator';
import { Role } from '../common/auth/auth.dto';
import { RolesGuard } from '../common/auth/roles.guard';
import { CustomJwtAuthGuard } from '../common/auth/jwt.strategy';
import { ApiResult, make_api_result } from '../common/api_result';
import { EventService } from './event.service';

@Controller("/event")
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {
    this.eventService = eventService;
  }

  @Get()
  @Roles(Role.USER)
  async getHello(): Promise<Record<string, any>> {
    try {
      const result = await this.eventService.getHello();
      return make_api_result(ApiResult.IS_OK);
    } catch (error) {
      console.error('Error in getHello:', error);
      return make_api_result(ApiResult.UNKNOWN_ERROR);
    }
  }
}