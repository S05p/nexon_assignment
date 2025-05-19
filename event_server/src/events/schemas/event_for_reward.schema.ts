import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventForRewardDocument = EventForReward & Document;

@Schema()
export class EventForReward {
    @Prop({ required: true })
    event_id: string;

    @Prop({ required: true })
    reward_id: string;
}

export const EventForRewardSchema = SchemaFactory.createForClass(EventForReward);