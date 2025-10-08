import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Card } from '../card/card.schema';
import { User } from '../user/user.schema';

@Schema()
export class Player {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Game' })
  game: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  main: Card[];

  @Prop({ default: 0 })
  actionPoints: number;

  @Prop()
  points: number;

  @Prop({ default: false })
  ready: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

// Add unique compound index to prevent duplicate players in the same game
PlayerSchema.index({ game: 1, user: 1 }, { unique: true });
