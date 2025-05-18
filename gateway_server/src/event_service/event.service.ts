import { Injectable } from "@nestjs/common";
import { EventAdapterService } from "../common/adapters/internal-service.service";

@Injectable()
export class EventService {
    constructor(private readonly eventAdapterService: EventAdapterService) {
        this.eventAdapterService = eventAdapterService;
    }

    async getHello(): Promise<string> {
        try {
            const result = await this.eventAdapterService.sendRequest({
                url: '/hello',
                method: 'GET',
            });
            return result;
        } catch (error) {
            console.error('Error in getHello:', error);
            throw error;
        }
    }
}