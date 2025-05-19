import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true})
    amount: number;

    @Prop({ required: true })
    created_user_id: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);