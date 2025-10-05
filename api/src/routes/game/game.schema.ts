import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GameState } from '../../enums/game-state.enum';
import { Card } from '../card/card.schema';
import { Player } from '../players/player.schema';

@Schema()
export class Game {
  _id: Types.ObjectId;

  @Prop({ type: String, enum: GameState, default: GameState.WAITING })
  state: GameState;

  @Prop()
  round: number;

  @Prop({ type: [{ type: Types.ObjectId }] })
  players: Player[];

  @Prop({ type: Object })
  options: GameOptionsBo;

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  playerWhoPlays: Player | null;

  @Prop({ type: [{ type: Types.ObjectId }] })
  deck: Card[];

  @Prop({ type: [{ type: Types.ObjectId }] })
  defausse: Card[];

  @Prop()
  indexLastPlayerWhoPlay: number;

  @Prop()
  playerDodge: string;

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
