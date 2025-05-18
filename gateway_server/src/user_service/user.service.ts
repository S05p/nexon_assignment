import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";
import { LoginUserDto, SignupUserDto } from "./user.dto";
import { ApiResult } from "../common/api_result";
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly authAdapterService: AuthAdapterService) {
        this.authAdapterService = authAdapterService;
    }

    async login(loginUserDto: LoginUserDto, res: Response): Promise<void> {
        const response = await this.authAdapterService.sendRequest({
            url: '/login',
            method: 'POST',
            data: loginUserDto,
        });

        if (response.result === ApiResult.IS_OK.result) {
            // JWT 토큰을 쿠키에 설정
            res.cookie('jwt', response.data.token, {
                httpOnly: true,
                secure: false, // 프로덕션 환경에서만 HTTPS 사용
                sameSite: 'lax',
                maxAge: 60 * 60, // 1시간
            });
        } else {
            if (response.code === ApiResult.USER_NOT_FOUND.code) {
                throw ApiResult.USER_NOT_FOUND;
            }
            else if (response.code === ApiResult.INVALID_PASSWORD.code) {
                throw ApiResult.INVALID_PASSWORD;
            }
            throw ApiResult.UNKNOWN_ERROR;
        }
    }   

    async signup(signupUserDto: SignupUserDto, res: Response): Promise<void> {
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
            if (response_data.code === ApiResult.USER_ALREADY_EXISTS.code) {
                throw ApiResult.USER_ALREADY_EXISTS;
            }
            else if (response_data.code === ApiResult.USER_NOT_FOUND.code) {
                throw ApiResult.USER_NOT_FOUND;
            }
            else if (response_data.code === ApiResult.INVALID_PASSWORD.code) {
                throw ApiResult.INVALID_PASSWORD;
            }
            throw ApiResult.UNKNOWN_ERROR;
        }
    }
}