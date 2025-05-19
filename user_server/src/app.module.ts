import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TransactionModule } from './common/transaction/transaction.module';
import { TraceMiddleware } from './common/middleware/trace.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AuthModule } from './common/auth/auth.module';
import { AppLogger } from './common/logger/app-logger.service';
import { UserModule } from './users/user.module';

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

    // User 모듈 설정
    UserModule,

    // Mongo 연결
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('mongoUri');
        if (!uri) {
          console.error('❌ MONGO_URI is not set!');
          process.exit(1);
        }
        return {
          uri,
          dbName: 'nesonAssignment',
          retryWrites: true,  // 네트워크 이슈 시 자동 재시도
          w: 'majority',      // 쓰기 응답을 majority 노드로부터 기다림
          readConcern: { level: 'majority' }, // 읽기 일관성 확보
          writeConcern: { w: 'majority', wtimeout: 5000 },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
