import { ConnectionType } from './connection.types';
import { PlayerWithId } from 'src/routes/players/player.schema';
import { GameWithId } from 'src/routes/game/game.schema';

export interface JoinGameRequest {
  gameId: string;
  type: ConnectionType;
}

export interface JoinGameResponse {
  gameData?: GameWithId;
  playerData?: PlayerWithId;
}
