import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AdminController } from './admin.controller';
import { InternalServiceModule } from '../common/adapters/internal-service.module';

@Module({
  imports: [InternalServiceModule],
  providers: [EventService],
  controllers: [EventController, AdminController],
})
export class EventModule {}