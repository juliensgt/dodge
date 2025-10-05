import { Game } from 'src/routes/game/game.schema';
import { Player } from 'src/routes/players/player.schema';
import { ConnectionType } from './connection.types';

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
}

export interface GameStateWithPlayer {
  gameData?: Game | null;
  playerData?: Player | null;
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  id: string;
  gameId: string;
  player: Player;
  message: string;
  date: Date;
}
