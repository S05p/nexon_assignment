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
            url: '/events-admin',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async getAdminEventDetail(eventId: string) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: `/events-admin/detail/${eventId}`,
            method: 'GET',
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }


    async getEventList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async getEventDetail(eventId: string) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: `/events/detail/${eventId}`,
            method: 'GET',
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async createEvent(user: any, data: any) {

        

        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events-admin',
            method: 'POST',
            data: {
                ...data,
                created_user_id: user.id,
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async createReward(user: any, data: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/rewards-admin',
            method: 'POST',
            data: {
                ...data,
                created_user_id: user.id,
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async getRewardList(query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/rewards-admin',
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async getHistoryList(user: any, query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/history',
            method: 'GET',
            params: query,
            data: {
                uid: user.id,
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async getAdminHistoryList(eventId: string, query: any) {
        const response_data = await this.eventAdapterService.sendRequest({
            url: `/events-admin/history/${eventId}`,
            method: 'GET',
            params: query,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }

    async createRewardReceipt(user: any, data: Record<string, any>) {
        const data_to_send = {
            ...data,
            uid: user.id,
        };
        const response_data = await this.eventAdapterService.sendRequest({
            url: '/events/reward-receive',
            method: 'POST',
            data: data_to_send,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message, response_data.data);
        }
        return response_data.data;
    }
}