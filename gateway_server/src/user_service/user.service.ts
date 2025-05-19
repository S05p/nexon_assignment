import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";
import { ApiResult, MsaFailed } from "../common/api_result";
import { Response, Request } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly authAdapterService: AuthAdapterService) {
        this.authAdapterService = authAdapterService;
    }

    async login(data: any, req: Request, res: Response): Promise<Record<string, any>> {
        const token = req.cookies?.jwt;
        if (token) {
            throw ApiResult.ALREADY_LOGGED_IN;
        }

        const response_data = await this.authAdapterService.sendRequest({
            url: '/login',
            method: 'POST',
            data: data,
        });

        if (response_data.result === ApiResult.IS_OK.result) {
            res.cookie('jwt', response_data.data.jwt_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60,
            });
        } else {
            throw new MsaFailed(response_data.code, response_data.message);
        }

        return {
            jwt_token: response_data.data.jwt_token,
            role: response_data.data.role,
        };
    }   

    async signup(data: any, req: Request, res: Response): Promise<Record<string, any>> {
        const token = req.cookies?.jwt;
        if (token) {
            throw ApiResult.ALREADY_LOGGED_IN;
        }

        const response_data = await this.authAdapterService.sendRequest({
            url: '/signup',
            method: 'POST',
            data: data,
        });

        if (response_data.result === ApiResult.IS_OK.result) {
            res.cookie('jwt', response_data.jwt_token, {
                httpOnly: true,
                secure: false, 
                sameSite: 'lax',
                maxAge: 60 * 60,
            });
        } else {
            throw new MsaFailed(response_data.code, response_data.message);
        }

        return {
            jwt_token: response_data.jwt_token,
            role: response_data.role,
        };
    }

    async logout(req: Request, res: Response): Promise<void> {
        const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw ApiResult.INVALID_SESSION;
        }
        if (req.cookies?.jwt) {
            res.clearCookie('jwt');
        }
    }

    async roleChange(data: any): Promise<void> {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/role_change',
            method: 'PUT',
            data: data,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }

    async inviteFriend(user: any): Promise<void> {
        const uid = user.id;

        const response_data = await this.authAdapterService.sendRequest({
            url: '/invite_friend',
            method: 'POST',
            data: {
                uid: uid,
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }

    async killMonster(user: any): Promise<void> {
        const uid = user.id;

        const response_data = await this.authAdapterService.sendRequest({
            url: '/kill_monster',
            method: 'POST',
            data: {
                uid: uid,
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }

    async loginCountUp(user: any): Promise<void> {
        const uid = user.id;

        const response_data = await this.authAdapterService.sendRequest({
            url: '/login_count_up',
            method: 'POST',
            data: {
                uid: uid,   
            },
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }
}