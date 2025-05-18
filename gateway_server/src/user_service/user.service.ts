import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";
import { LoginUserDto, SignupUserDto } from "./user.dto";
import { ApiResult, MsaFailed } from "../common/api_result";
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly authAdapterService: AuthAdapterService) {
        this.authAdapterService = authAdapterService;
    }

    async login(loginUserDto: LoginUserDto, res: Response): Promise<void> {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/login',
            method: 'POST',
            data: loginUserDto,
        });

        if (response_data.result === ApiResult.IS_OK.result) {
            // JWT 토큰을 쿠키에 설정
            res.cookie('jwt', response_data.jwt_token, {
                httpOnly: true,
                secure: false, // 프로덕션 환경에서만 HTTPS 사용
                sameSite: 'lax',
                maxAge: 60 * 60, // 1시간
            });
        } else {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }   

    async signup(signupUserDto: SignupUserDto, res: Response): Promise<any> {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/user/signup',
            method: 'POST',
            data: signupUserDto,
        });

        console.log(response_data);

        if (response_data.result === ApiResult.IS_OK) {
            // JWT 토큰을 쿠키에 설정
            res.cookie('jwt', response_data.jwt_token, {
                httpOnly: true,
                secure: false, // 프로덕션 환경에서만 HTTPS 사용
                sameSite: 'lax',
                maxAge: 60 * 60, // 1시간
            });
        } else {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }
}