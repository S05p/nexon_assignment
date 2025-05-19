import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { MsaFailed, ApiResult } from '../api_result';
export abstract class AdapterService {
  abstract sendRequest(request: AxiosRequestConfig): Promise<any>;
}

@Injectable()
export class AuthAdapterService extends AdapterService {
  private readonly baseUrl: string;

  constructor(configService: ConfigService) {
    super();
    this.baseUrl = configService.get('userServiceUrl')!; 
  }

  async sendRequest(request: AxiosRequestConfig): Promise<any> {
    const config = {
      ...request,
      url: this.baseUrl + request.url,
    };
    const response = await axios.request(config);

    if (response.status >= 400) {
      throw new MsaFailed(ApiResult.UNKNOWN_ERROR.code, ApiResult.UNKNOWN_ERROR.message, response.data);
    }

    return response.data;
  }
}

@Injectable()
export class EventAdapterService extends AdapterService {
  private readonly baseUrl: string;

  constructor(configService: ConfigService) {
    super();
    this.baseUrl = configService.get('eventServiceUrl')!;
  }

  async sendRequest(request: AxiosRequestConfig): Promise<any> {
    const config = {
      ...request,
      url: this.baseUrl + request.url,
    };
    const response = await axios.request(config);

    if (response.status >= 400) {
      throw new MsaFailed(ApiResult.UNKNOWN_ERROR.code, ApiResult.UNKNOWN_ERROR.message, response.data);
    }

    return response.data;
  }
}