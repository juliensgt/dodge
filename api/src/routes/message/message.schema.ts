import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ collection: 'messages' })
export class Message {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  gameId: string;

  @Prop()
  playerId: string;

  @Prop()
  message: string;

  @Prop()
  date: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
