import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export const verifyToken = (token: string, configService: ConfigService): any => {
  const jwtSecret = configService.get<string>('jwtSecret');
  return jwt.verify(token, jwtSecret);
};