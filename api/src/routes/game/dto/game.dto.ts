import { GameState } from '../../../enums/game-state.enum';
import { GameOptionsBo, GameWithId } from '../game.schema';

export class GameDto {
  id: string;
  round: number;
  players: string[];
  state: GameState;
  options: GameOptionsBo;

  static fromGame(game: GameWithId): GameDto {
    const dto = new GameDto();
    dto.id = game._id.toString();
    dto.round = game.round;
    dto.players = game.players.map((player) => player.toString());
    dto.state = game.gameState;
    dto.options = game.options;
    return dto;
  }
}
