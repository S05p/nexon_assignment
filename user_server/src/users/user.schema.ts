import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    email: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true, default: Date.now })
    created_at: Date;

    @Prop({ required: true, default: Date.now })
    updated_at: Date;

    @Prop({ required: true, default: false })
    is_deleted: boolean;

    @Prop({ required: true, default: true })
    is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);