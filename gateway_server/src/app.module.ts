import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

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
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
