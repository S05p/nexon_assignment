import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";

@Injectable()
export class UserService {
    constructor(private readonly authAdapterService: AuthAdapterService) {
        this.authAdapterService = authAdapterService;
    }

    async getHello(): Promise<string> {
        // const result = await this.authAdapterService.sendRequest({
        //     url: '/hello',
        //     method: 'GET',
        // });
        const result = "hello";
        return result;
    }


}