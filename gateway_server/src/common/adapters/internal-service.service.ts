import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

export abstract class AdapterService {
  abstract sendRequest(request: AxiosRequestConfig): Promise<any>;
}

@Injectable()
export class AuthAdapterService extends AdapterService {
  private readonly baseUrl: string;

  constructor() {
    super();
    this.baseUrl = 'http://user:3001'; 
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

  constructor() {
    super();
    this.baseUrl = 'http://event:3002';
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