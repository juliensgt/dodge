import { GameState } from '../../../enums/game-state.enum';
import { GameOptionsBo } from '../game.schema';
import { PlayerDto } from '../../players/dto/player.dto';

export class GameDto {
  id: string;
  players: PlayerDto[];
  gameState: GameState;
  options: GameOptionsBo;
  round: number;
}
