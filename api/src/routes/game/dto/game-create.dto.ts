import { GameState } from '../../../enums/game-state.enum';
import { Player } from '../../players/player.schema';
import { Card } from '../../card/card.schema';
import type { GameOptionsBo } from '../game.schema';
import {
  IsOptional,
  IsArray,
  IsEnum,
  IsObject,
  IsNumber,
  IsString,
} from 'class-validator';

export class GameCreateDto {
  @IsOptional()
  @IsArray()
  players: Player[];

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
}

export const defaultGameCreateDto: GameCreateDto = {
  players: [],
  deck: [],
  defausse: [],
  gameState: GameState.WAITING,
  options: {
    pointsForActionError: 5,
    limitPoints: 150,
    maxPlayers: 8,
    nbSeeFirstCards: 2,
    timeToPlay: 5,
    timeToStartGame: 3,
    timeToSeeCards: 5,
    nbCards: 4,
  },
  indexLastPlayerWhoPlay: -1,
  indexPlayerWhoPlays: -1,
  playerDodge: '',
  round: 0,
  tour: 0,
};
