import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TransactionModule } from './common/transaction/transaction.module';
import { _controllers } from './app.controller';
import { _providers, _exports } from './app.providers_exports';
import { TraceMiddleware } from './common/middleware/trace.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    // Transaction 모듈 설정
    TransactionModule,

    // Auth 모듈 설정
    AuthModule,

    // Mongo 연결
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoUri'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: _controllers,
  providers: _providers,
  exports: _exports,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware,RequestLoggerMiddleware).forRoutes('*'); // 모든 요청에 미들웨어 적용
  }
}
