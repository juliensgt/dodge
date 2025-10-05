import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Player } from '../players/player.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ collection: 'messages' })
export class Message {
  _id: Types.ObjectId;

  @Prop()
  gameId: string;

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  player: Player;

  @Prop()
  message: string;

  @Prop()
  date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
