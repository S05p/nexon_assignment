import { AppLogger } from './common/logger/app-logger.service';
import { AppService } from './app.service';

export const _providers = [AppLogger, AppService];
export const _exports = [AppLogger];