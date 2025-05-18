import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";
import { ApiResult, MsaFailed } from "../common/api_result";
import { ApiError } from "../common/api_error";
import { CreateEventDto, CreateRewardDto, GetEventListQueryDto, GetEventDetailPathDto, CreateRewardReceiptDto, GetRewardListQueryDto, GetHistoryListQueryDto, GetAdminHistoryListQueryDto } from "./event.dto";

@Injectable()
export class EventService {
    constructor(private readonly authAdapterService: AuthAdapterService) {}

    async getEventList(query: GetEventListQueryDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getEventDetail(eventId: string) {
        const response_data = await this.authAdapterService.sendRequest({
            url: `/event/${eventId}`,
            method: 'GET',
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createEvent(eventData: CreateEventDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/admin/event',
            method: 'POST',
            data: eventData,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createReward(rewardData: CreateRewardDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/admin/reward',
            method: 'POST',
            data: rewardData,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getRewardList(query: GetRewardListQueryDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/admin/reward',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getHistoryList(query: GetHistoryListQueryDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/history',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getAdminHistoryList(query: GetAdminHistoryListQueryDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/admin/history',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createRewardReceipt(data: CreateRewardReceiptDto) {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/event/reward/receive',
            method: 'POST',
            data: data,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }
}