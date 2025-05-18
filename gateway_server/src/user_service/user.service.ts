import { Injectable } from "@nestjs/common";
import { AuthAdapterService } from "../common/adapters/internal-service.service";
import { LoginUserDto, SignupUserDto, RoleChangeDto } from "./user.dto";
import { ApiResult, MsaFailed } from "../common/api_result";
import { Response, Request } from 'express';
import { ApiError } from "../common/api_error";

@Injectable()
export class UserService {
    constructor(private readonly authAdapterService: AuthAdapterService) {
        this.authAdapterService = authAdapterService;
    }

    async login(loginUserDto: LoginUserDto, req: Request, res: Response): Promise<void> {
        const token = req.cookies?.jwt;
        if (token) {
            throw ApiResult.ALREADY_LOGGED_IN;
        }

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

    async signup(signupUserDto: SignupUserDto, req: Request, res: Response): Promise<void> {
        const token = req.cookies?.jwt;
        if (token) {
            throw ApiResult.ALREADY_LOGGED_IN;
        }

        const response_data = await this.authAdapterService.sendRequest({
            url: '/signup',
            method: 'POST',
            data: signupUserDto,
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

    async roleChange(roleChangeDto: RoleChangeDto): Promise<void> {
        const response_data = await this.authAdapterService.sendRequest({
            url: '/role_change',
            method: 'PUT',
            data: roleChangeDto,
        });

        if (response_data.result !== ApiResult.IS_OK.result) {
            throw new MsaFailed(response_data.code, response_data.message);
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        const token = req.cookies?.jwt;
        if (!token) {
            throw ApiResult.INVALID_SESSION;
        }
        res.clearCookie('jwt');
    }
}