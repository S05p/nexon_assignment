import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventForUserDocument = EventForUser & Document;

@Schema()
export class EventForUser {
    @Prop({ required: true })
    event_id: string;

    @Prop({ required: true })
    uid: string;

    @Prop({ required: true , default: Date.now })
    created_at: Date;
}

export const EventForUserSchema = SchemaFactory.createForClass(EventForUser);