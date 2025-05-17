import { Injectable } from "@nestjs/common";
import { EventAdapterService } from "../common/adapters/internal-service.service";

@Injectable()
export class EventService {
    constructor(private readonly eventAdapterService: EventAdapterService) {
        this.eventAdapterService = eventAdapterService;
    }

    async getHello(): Promise<string> {
        const result = await this.eventAdapterService.sendRequest({
            url: '/hello',
            method: 'GET',
        });
        return result;
    }


}