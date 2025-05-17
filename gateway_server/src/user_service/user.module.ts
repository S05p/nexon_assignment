import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InternalServiceModule } from '../common/adapters/internal-service.module';

@Module({
  imports: [InternalServiceModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}