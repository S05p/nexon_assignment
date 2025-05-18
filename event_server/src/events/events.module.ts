import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './event.schema';
import { Reward, RewardSchema } from './reward.schema';
import { EventForReward, EventForRewardSchema } from './event_for_reward.schema';
import { EventForUser, EventForUserSchema } from './event_for_user.schema';
import { UserHistory, UserHistorySchema } from '../users/user_history.schema';
import { User, UserSchema } from '../users/user.schema';
import { UserInventory, UserInventorySchema } from '../users/user_inventory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: EventForReward.name, schema: EventForRewardSchema },
      { name: EventForUser.name, schema: EventForUserSchema },
      { name: UserHistory.name, schema: UserHistorySchema },
      { name: User.name, schema: UserSchema },
      { name: UserInventory.name, schema: UserInventorySchema }
    ])  
  ],  
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventsModule {} 