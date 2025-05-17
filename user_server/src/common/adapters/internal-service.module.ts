import { Module } from '@nestjs/common';
import { AuthAdapterService, EventAdapterService } from './internal-service.service';

@Module({
  providers: [AuthAdapterService, EventAdapterService],
  exports: [AuthAdapterService, EventAdapterService],
})  
export class InternalServiceModule {}