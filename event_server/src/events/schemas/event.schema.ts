import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ConditionType } from '../event.dto';

export type EventDocument = Event & Document;

@Schema()
export class Event {
    _id?: Types.ObjectId;

    @Prop({ required: true })
    created_user_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: true })
    end_date: Date;

    @Prop({ required: true, default: true })
    is_active: boolean;

    @Prop({ required: true, default: false })
    is_deleted: boolean;

    @Prop({ required: true, default: Date.now })
    created_at: Date;

    @Prop({ required: true, default: Date.now }) 
    updated_at: Date;

    @Prop({ required: true })
    condition_type: ConditionType;

    @Prop({ required: true})
    condition_value: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);