import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

export abstract class AdapterService {
  abstract sendRequest(request: AxiosRequestConfig): Promise<any>;
}

@Injectable()
export class AuthAdapterService extends AdapterService {
  private readonly baseUrl: string;

  constructor(configService: ConfigService) {
    super();
    this.baseUrl = `http://user:${configService.get('authServicePort')}`; 
  }

  async sendRequest(request: AxiosRequestConfig): Promise<any> {
    const config = {
      ...request,
      url: this.baseUrl + request.url,
    };
    const response = await axios.request(config);
    return response.data;
  }
}

@Injectable()
export class EventAdapterService extends AdapterService {
  private readonly baseUrl: string;

  constructor(configService: ConfigService) {
    super();
    this.baseUrl = `http://event:${configService.get('eventServicePort')}`;
  }

  async sendRequest(request: AxiosRequestConfig): Promise<any> {
    const config = {
      ...request,
      url: this.baseUrl + request.url,
    };
    const response = await axios.request(config);
    return response.data;
  }
}