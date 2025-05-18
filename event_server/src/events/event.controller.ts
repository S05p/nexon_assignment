import { Controller, Get, Body, Post, Query, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiResult, make_api_result } from '../common/api_result';
import { ApiError } from '../common/api_result';
import { CreateEventDto, CreateRewardDto, GetEventListQueryDto, GetEventDetailPathDto, CreateRewardReceiptDto, GetRewardListQueryDto, GetHistoryListQueryDto, GetAdminHistoryListQueryDto} from './event.dto';

@Controller('/event') // docker로 배포시 삭제
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get('')
    async getEventList(@Query() getEventListQueryDto: GetEventListQueryDto) {
        try {
        const result = await this.eventService.getEventList(getEventListQueryDto)
        return make_api_result(ApiResult.IS_OK, result);
        } catch (error) {
        if (error instanceof ApiError) {
            return make_api_result(error);
        }
        console.error('Error in getEvent:', error);
        return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }

    @Get('/:event_id')
    async getEventDetail(@Param() getEventDetailPathDto: GetEventDetailPathDto) {
        try {
            const result = await this.eventService.getEventDetail(getEventDetailPathDto.event_id)
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
    async getHistoryList(@Query() getHistoryListQueryDto: GetHistoryListQueryDto) {
        try {
            const result = await this.eventService.getHistoryList(getHistoryListQueryDto)
            return make_api_result(ApiResult.IS_OK, result);
        } catch (error) {
            if (error instanceof ApiError) {
                return make_api_result(error);
            }
            console.error('Error in getHistoryList:', error);
            return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }

    @Post('/reward/receive')
    async createRewardReceipt(@Body() createRewardReceiptDto: CreateRewardReceiptDto) {
        try {
            await this.eventService.createRewardReceipt(createRewardReceiptDto)
            return make_api_result(ApiResult.IS_OK);
        } catch (error) {
            if (error instanceof ApiError) {
                return make_api_result(error);
            }
            console.error('Error in createRewardReceipt:', error);
            return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }
} 

@Controller('/event/admin') // docker로 배포시 삭제
export class AdminController {
    constructor(private readonly eventService: EventService) {}

    @Get('/history')
    async getAdminHistoryList(@Query() getAdminHistoryListQueryDto: GetAdminHistoryListQueryDto) {
        try {
            const result = await this.eventService.getAdminHistoryList(getAdminHistoryListQueryDto)
            return make_api_result(ApiResult.IS_OK, result);
        } catch (error) {
            if (error instanceof ApiError) {
                return make_api_result(error);
            }
            console.error('Error in getAdminHistoryList:', error);
            return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }

    @Post('/event')
    async createEvent(@Body() createEventDto: CreateEventDto) {
        try {
        await this.eventService.createEvent(createEventDto)
        return make_api_result(ApiResult.IS_OK);
        } catch (error) {
        if (error instanceof ApiError) {
            return make_api_result(error);
        }
        console.error('Error in createEvent:', error);
        return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }

    @Post('/reward')
    async createReward(@Body() createRewardDto: CreateRewardDto) {
        try {
            await this.eventService.createReward(createRewardDto)
            return make_api_result(ApiResult.IS_OK);
        } catch (error) {
            if (error instanceof ApiError) {
                return make_api_result(error);
            }
            console.error('Error in createReward:', error);
            return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }

    @Get('/reward')
    async getRewardList(@Query() getRewardListQueryDto: GetRewardListQueryDto) {
        try {
            const result = await this.eventService.getRewardList(getRewardListQueryDto)
            return make_api_result(ApiResult.IS_OK, result);
        } catch (error) {
            if (error instanceof ApiError) {
                return make_api_result(error);
            }
            console.error('Error in getRewardList:', error);
            return make_api_result(ApiResult.UNKNOWN_ERROR);
        }
    }
}