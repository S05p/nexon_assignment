import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInventoryDocument = UserInventory & Document;

@Schema()
export class UserInventory {
    @Prop({ required: true })
    uid: string;

    @Prop({ required: true })
    reward_id: string;

    @Prop({ required: true })
    amount: number;
}

export const UserInventorySchema = SchemaFactory.createForClass(UserInventory);