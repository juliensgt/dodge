import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Card } from '../card/card.schema';
import { Game } from '../game/game.schema';
import { User } from '../user/user.schema';

export type PlayerWithId = Player & { _id: Types.ObjectId };

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ collection: 'players' })
export class Player {
  @Prop({ type: Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  main: Card[];

  @Prop()
  points: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

// Add unique compound index to prevent duplicate players in the same game
PlayerSchema.index({ game: 1, user: 1 }, { unique: true });
