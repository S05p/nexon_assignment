import { Injectable } from "@nestjs/common";
import { EventAdapterService } from "../common/adapters/internal-service.service";
import { ApiResult, MsaFailed } from "../common/api_result";

@Injectable()
export class EventService {
    constructor(private readonly eventAdapterService: EventAdapterService) {
        this.eventAdapterService = eventAdapterService;
    }

    async getAdminEventList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/admin',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getAdminEventDetail(eventId: string) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: `/events/admin/${eventId}`,
            method: 'GET',
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }


    async getEventList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getEventDetail(eventId: string) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: `/events/${eventId}`,
            method: 'GET',
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createEvent(data: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/admin',
            method: 'POST',
            data: data,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createReward(data: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/admin/reward',
            method: 'POST',
            data: data,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getRewardList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/admin/reward',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getHistoryList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/history',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async getAdminHistoryList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/admin/history',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }

    async createRewardReceipt(data: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/reward-receive',
            method: 'POST',
            data: data,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
        return response_data;
    }
}