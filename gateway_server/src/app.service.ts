import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello():  Record<string, any> {
    return {
      "1": 'Hello World!',
    };
  }
}
