import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserHistoryDocument = UserHistory & Document;

@Schema()
export class UserHistory extends Document {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  login_count: number;

  @Prop({ required: true })
  invited_friend_count: number;

  @Prop({ required: true })
  kill_monster_count: number;
}

export const UserHistorySchema = SchemaFactory.createForClass(UserHistory);