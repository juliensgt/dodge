import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GameState } from '../../enums/game-state.enum';
import { Card } from '../card/card.schema';

export type GameDocument = HydratedDocument<Game>;

export type GameWithId = Game & { _id: Types.ObjectId };

@Schema({ collection: 'games' })
export class Game {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Player' }] })
  players: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  deck: Card[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  defausse: Card[];

  @Prop({ type: String, enum: GameState, default: GameState.WAITING })
  gameState: GameState;

  @Prop({ type: Object })
  options: GameOptionsBo;

  @Prop()
  indexLastPlayerWhoPlay: number;

  @Prop()
  indexPlayerWhoPlays: number;

  @Prop()
  playerDodge: string;

  @Prop()
  round: number;

  @Prop()
  tour: number;
}

export interface GameOptionsBo {
  pointsForActionError: number;
  limitPoints: number;
  maxPlayers: number;
  nbSeeFirstCards: number;
  timeToPlay: number;
  timeToStartGame: number;
  timeToSeeCards: number;
  nbCards: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
