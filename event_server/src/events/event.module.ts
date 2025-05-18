import { Module } from '@nestjs/common';
import { EventController, AdminController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import { Reward, RewardSchema } from './reward.schema';
import { EventForReward, EventForRewardSchema } from './event_for_reward.schema';
import { EventForUser, EventForUserSchema } from './event_for_user.schema';
import { UserInventory, UserInventorySchema } from '../users/user_inventory.schema';
import { UserHistory, UserHistorySchema } from '../users/user_history.schema';

@Module({   
    imports: [          
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
            { name: Reward.name, schema: RewardSchema },
            { name: EventForReward.name, schema: EventForRewardSchema },
            { name: EventForUser.name, schema: EventForUserSchema },
            { name: UserInventory.name, schema: UserInventorySchema },
            { name: UserHistory.name, schema: UserHistorySchema }
        ]),
    ],
    controllers: [EventController, AdminController],
    providers: [EventService],
})  
export class EventModule {}