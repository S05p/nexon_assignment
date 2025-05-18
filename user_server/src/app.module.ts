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
        console.log('uri', uri);
        if (!uri) {
          console.error('❌ MONGO_URI is not set!');
          process.exit(1);
        }
        return {
          uri,
          dbName: 'nesonAssignment',
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
