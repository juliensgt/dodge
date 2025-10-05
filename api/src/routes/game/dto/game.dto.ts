import { GameState } from '../../../enums/game-state.enum';
import { GameOptionsBo, Game } from '../game.schema';
import { PlayerDto } from '../../players/dto/player.dto';

export class GameDto {
  id: string;
  state: GameState;
  round: number;
  players: PlayerDto[];
  options: GameOptionsBo;
  playerWhoPlays: PlayerDto;

  static fromGame(game: Game): GameDto {
    const dto = new GameDto();
    dto.id = game._id.toString();
    dto.state = game.state;
    dto.round = game.round;
    if (game.players.length > 0) {
      dto.players = game.players.map((player) => PlayerDto.fromPlayer(player, player.user));
    }
    dto.options = game.options;
    if (game.playerWhoPlays) {
      dto.playerWhoPlays = PlayerDto.fromPlayer(game.playerWhoPlays, game.playerWhoPlays.user);
    }
    return dto;
  }
}
