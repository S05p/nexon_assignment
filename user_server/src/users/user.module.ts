import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';   
import { UserInventory, UserInventorySchema } from './user_inventory.schema';
import { UserController } from './user.controller';
import { UserHistory, UserHistorySchema } from './user_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserHistory.name, schema: UserHistorySchema },
      { name: UserInventory.name, schema: UserInventorySchema }
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}