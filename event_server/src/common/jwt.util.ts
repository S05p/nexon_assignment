import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export const verifyToken = (token: string, configService: ConfigService): any => {
  return jwt.verify(token,  configService.get<string>('jwtSecret')!);
};