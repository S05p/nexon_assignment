import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new ApiExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
