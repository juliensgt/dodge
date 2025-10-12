import { GameState } from '../../../enums/game-state.enum';
import { Card } from '../../card/card.schema';
import type { GameOptionsBo } from '../game.schema';
import { Types } from 'mongoose';
import {
  IsOptional,
  IsArray,
  IsEnum,
  IsObject,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

export class GameCreateDto {
  @IsOptional()
  @IsArray()
  players: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  deck: Card[];

  @IsOptional()
  @IsArray()
  defausse: Card[];

  @IsOptional()
  @IsEnum(GameState)
  gameState: GameState;

  @IsOptional()
  @IsString()
  gameMode: string;

  @IsOptional()
  @IsObject()
  options: GameOptionsBo;

  @IsOptional()
  @IsNumber()
  indexLastPlayerWhoPlay: number;

  @IsOptional()
  @IsNumber()
  indexPlayerWhoPlays: number;

  @IsOptional()
  @IsString()
  playerDodge: string;

  @IsOptional()
  @IsNumber()
  round: number;

  @IsOptional()
  @IsNumber()
  tour: number;

  @IsOptional()
  @IsBoolean()
  privateGame: boolean;

  @IsOptional()
  @IsString()
  password?: string;
}

export const defaultGameCreateDto: GameCreateDto = {
  players: [],
  deck: [],
  defausse: [],
  gameState: GameState.WAITING,
  options: {
    pointsForActionError: 5,
    limitPoints: 150,
    maxPlayers: 6,
    nbSeeFirstCards: 2,
    timeToPlay: 5,
    timeToStartGame: 3,
    timeToSeeCards: 5,
    nbCardsPerPlayer: 4,
    modeDeJeu: ['default'],
  },
  indexLastPlayerWhoPlay: -1,
  indexPlayerWhoPlays: -1,
  playerDodge: '',
  round: 0,
  tour: 0,
  gameMode: 'classic',
  privateGame: false,
  password: undefined,
};
