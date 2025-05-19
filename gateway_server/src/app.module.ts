import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TraceMiddleware } from './common/middleware/trace.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AuthModule } from './common/auth/auth.module';
import { InternalServiceModule } from './common/adapters/internal-service.module';
import { UserModule } from './user_service/user.module';
import { EventModule } from './event_service/event.module';
import { AppService } from './app.service';
import { AppLogger } from './common/logger/app-logger.service';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    // Auth 모듈 설정
    AuthModule,

    // Internal Service 모듈 설정
    InternalServiceModule,

    // route, service 모듈 설정
    UserModule,
    EventModule,
  ],
  providers: [AppLogger, AppService],
  exports: [AppLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
